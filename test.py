import web
import MySQLdb
import json






urls = (
  '/delaytest','delaytest',
  '/getcategories','GetCategories', #Gets all the categories



)



db = web.database(host="127.0.0.1", port="3306" , dbn='mysql' , user="root", pw="root", db="new_schema")


class delaytest:
    def GET(self):
        try:
            return "Its working"
        except Exception as e:
            print e
            return e
class GetCategories:
    def POST(self):
        return "Get Method only supported. No Authorization Required"
    def OPTIONS(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        return
    def GET(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        get_customer_response =[]
        try:

            
            # my_request_params = web.input()

            # # Fetch Identifier Key - mandatory - else error
            # if 'identifier_key' not in my_request_params or my_request_params.identifier_key is None or my_request_params.identifier_key == '':
            #     return experiences_common.sendErrorMessage("Please provide identifier_key Key information")
            # elif my_request_params.identifier_key !="email" and my_request_params.identifier_key !="mobile" and my_request_params.identifier_key !="external_id" and my_request_params.identifier_key !="social":
            #     return experiences_common.sendErrorMessage("Please provide valid identifier_key  (email, mobile,external_id,social)")

            # my_identifier_key = my_request_params.identifier_key  

            # Fetch from local first and then from the capillary API
            category_data = db.query("select * from category")
            final_data = []
            for category in category_data:
                category_json = {}
                category_json.category_id = category.id
                category_json.category_name = category.name
                category_json.category_parentId = category.parentId
                category_json.category_path = category.path
                category_json.category_backgroudImage = category.backgroudImage
                category_json.category_createdAt = category.createdAt
                final_data.append(category_json)
            print final_data
            # return
            # final_data = json.dumps(final_data)
            # final_data = json.loads(final_data)
            # pyDict = {'code':'202','status':'fail','response':final_data}
            # get_customer_response.append(pyDict)
            # response = json.dumps(get_customer_response)
            # print response
            # return response 
        except Exception as e:
            print e
            pyDict = {'code':'201','status':'fail','message':e}            
            get_customer_response.append(pyDict)
            response =json.dumps(get_customer_response)
            return response

if __name__ == "__main__": 
    app = web.application(urls, globals())    
    app.run()     
else:
    app = web.application(urls, globals())
    application = app.wsgifunc()


