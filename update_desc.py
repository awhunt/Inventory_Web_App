import sqlite3
import os

directory = "../ProductResults/" 
column_dict = {"sku": 0,
				"descr": 20,
				"loc" :21,
				"qoh": 27,
				"upc" :11,
				"price": 25,
				"dept_id": 8,
				"promo": -1
			  }

# column_dict = {"sku": 0,
# 				"desc": 1,
# 				"loc" :2,
# 				"qoh": 4,
# 				"upc" :10,
# 				"price": 6,
# 				"dept": 8,
# 				"promo": -1
# 			  }

column_list = ["sku","descr",
				"loc","qoh",
				"upc" ,"price",
				"dept_id","promo"]


UPDATE_STR = ""
INSERT_STR = ""
INDEX_LIST = list()

def set_update_str(upd_str):
	upd_str = """UPDATE Items SET """

	for col in column_list:
		if column_dict[col] >= 0:
			upd_str += col + "=?,"
	upd_str = upd_str[:len(upd_str) - 1]
	upd_str += """ WHERE sku = ?"""
	return upd_str


def set_insert_str(ins_str):
	ins_str = """INSERT INTO Items (sku, descr, loc, QOH,""" + \
			  """upc, price, dept_id, promo)\nVALUES("""

	for col in column_list:
		if column_dict[col] >= 0:
			INDEX_LIST.append(column_dict[col])
			ins_str += "?,"
		else:
			ins_str += "0,"


	ins_str = ins_str[:len(ins_str) - 1]
	ins_str += ")"
	return ins_str


def parse_csv_line(parse_me):

	val_list = list()
	temp_str = ""
	comma = ','
	double_quote = "\""

	index = 0

	while index < len(parse_me):
		if (parse_me[index] == double_quote):
			index += 1
			while( (index + 1) < len(parse_me) ):
				if (parse_me[index] == double_quote):
					if(parse_me[index + 1] == double_quote):
						temp_str += parse_me[index]
						index += 1
					else:
						index += 1
						break
				else:
					temp_str += parse_me[index]
				index += 1

			val_list.append(temp_str)
			temp_str = ""

		elif parse_me[index] == comma:
			val_list.append(temp_str)
			temp_str = ""
		else:
			temp_str = temp_str + parse_me[index]

		index += 1

	val_list.append(temp_str)
	
	return val_list


UPDATE_STR = set_update_str(UPDATE_STR)
INSERT_STR = set_insert_str(INSERT_STR)


# loop through all the files in data directory
for filename in os.listdir(directory):
	
	if (".csv" not in filename):
		continue

	filelen = len(filename)
	dept = filename[(filelen - 6):(filelen - 4)]
	f = open(directory + filename)
	print("processing " + filename + " ...")
	count = 0
	locs = dict()

	# loop through each row in file
	for line in f:

		# skip first line
		if count == 0:
			count += 1
			continue

		line = line.strip('\n')
		row = parse_csv_line(line)

		# if not (row[column_dict["sku"]].isnumeric()):
		# 	continue

		db = sqlite3.connect("search/var/ace_items.sqlite3")
		db.text_factory = str
		ace_db = db.cursor()

		update_list = list()
		for index in INDEX_LIST:
			update_list.append(row[index])
		
		if ace_db.execute(("""select * from Items where sku=?"""), 
						  (row[column_dict["sku"]],)).fetchall() == []:
			ace_db.execute(INSERT_STR, update_list)
		else:
			update_list.append(row[column_dict["sku"]])
			ace_db.execute((UPDATE_STR), update_list)
			
		db.commit()
		db.close()
	
	# commit changes and close
	f.close()
