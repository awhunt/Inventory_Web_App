"""API functions."""
import flask
import requests
import search

SKU_LEN1 = 5
SKU_LEN2 = 7

def is_number(to_check):
    for ch in to_check:
        if not ch.isdigit():
            return False

    return True

@search.app.route('/api/<int:sku>', methods=["GET"])
def get_doc(sku):
    """Get a single document."""
    ace_db = search.model.get_db()
    context = ace_db.execute("""Select * from \
                                Items where \
                                sku={}""".format(sku)).fetchone()

    return flask.jsonify(**context)


@search.app.route('/api', methods=["GET"])
def get_hits():
    """Get hits from search server."""
    ace_db = search.model.get_db()
    query = flask.request.args.get('q')
    query_list = query.split(' ')

    if query is None:
        return flask.jsonify({})

    sql_string = """Select * from Items where """
    
    # case where user enters in a sku
    if len(query_list) == 1 and (len(query_list[0]) == SKU_LEN1 \
        or len(query_list[0]) == SKU_LEN2) and is_number(query_list[0]):
        sku = query_list[0]
        sql_string = sql_string + "sku=" + sku
    # general case
    else:
        index = 0
        # construct query string
        for word in query_list:
            sql_string = sql_string + " descr like \"%" + word + "%\""
            
            # case to not add "and" at the end of the string
            if index < (len(query_list) - 1):
                sql_string = sql_string + " and "

            index += 1

    response = dict()
    response["Items"] = ace_db.execute(sql_string).fetchall()

    return flask.jsonify(**response)
