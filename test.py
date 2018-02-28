import web
import MySQLdb
import json






urls = (
  '/app/getcategory','GetCategories', #Gets all the categories
  '/app/addUpdatecategory','AddUpdateCategories', #Add new category
  '/app/getproduct/?[0-9]*','GetProducts', #Get all products for the selected category or all
  '/app/addUpdateproduct/?[0-9]*','AddUpdateProducts', #Get all products for the selected category or all
  '/app/login','Applogin',
  '/app/register','Register',
  
  




)



db = web.database(host="127.0.0.1", port="3306" , dbn='mysql' , user="root", pw="root", db="new_schema")


#User Registration and Login
#Login
class Applogin:
    def POST(self,id):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = web.data() # to read raw data
        try:
            userObj = db.query("select * from user where email="+data.email+" and password="+data.password) 
            if len(userObj) > 0:
                userdata = {}
                for user in userObj:
                    userdata.id = user.id
                    userdata.firstName = user.firstName
                    userdata.lastName = user.lastName
                    userdata.mobile = user.mobile
                    userdata.fax = user.fax
                    userdata.email = user.email
                    userdata.company = user.company
                    userdata.subscription = user.subscription
                    userdata.authtoken = user.authtoken
                    userdata.address = db.query("select * from address where userId="+user.id)
                    pyDict = {'code':'200','status':'user data',user:userdata}            
                    return json.dumps(pyDict)
            else:
                pyDict = {'code':'201','status':'user is invalid',user:{}}
                return json.dumps(pyDict)            


        except Exception as e:
            print e
            pyDict = {'code':'201','status':'','failmessage':e}            
            response =json.dumps(pyDict)
            return response

    def OPTIONS(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        return
    def GET(self,categoryId):
        return "Get Method only supported. No Authorization Required"

#Register   
class Register:
    def POST(self,id):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = web.data() # to read raw data
        try:
            userObj = db.query("select * from user where email="+data.email) 
            if len(userObj) <= 0:
                authtoken = "token"
                userdata_data = db.insert("user",firstName=data.firstName,lastName=data.lastName,mobile=data.mobile,fax=data.fax,email=data.email,company=data.company,authtoken=authtoken,subscription=subscription)
                user_address = db.insert("address",streetAddress=data.streetAddress,pincode=data.pincode,city=data.city,state=data.state,country=data.country,addressType=data.addressType,userId=userdata_data)
                pyDict = {'code':'200','status':"succes",'user_data':userdata_data}            
                return json.dumps(pyDict)
            else:
                pyDict = {'code':'201','status':'user already exist',"user":{}}
                return json.dumps(pyDict)            


        except Exception as e:
            print e
            pyDict = {'code':'201','status':'','failmessage':e}            
            response =json.dumps(pyDict)
            return response

    def OPTIONS(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        return
    def GET(self,categoryId):
        return "Get Method only supported. No Authorization Required"



#Product CURD
#Get all products for the selected category or all
class GetProducts:
    def POST(self):
        return "Get Method only supported. No Authorization Required"
    def OPTIONS(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        return
    def GET(self,categoryId):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        try:
            if categoryId:
                product_data = db.query("select * from product where categoryId	 ="+categoryId)
            else:
                product_data = db.query("select * from product ")
            final_data = []
            for product in product_data:
                product_json = {}
                product_json.id = product.id
                product_json.name = product.name
                product_json.price = product.price
                product_json.currency = product.currency
                product_json.categoryId = product.categoryId
                product_json.createdAt = product.createdAt
                product_json.is_active = product.active
                product_json.is_available = product.is_available
                product_json.is_todaysSpecial = product.is_todaysSpecial
                product_json.product_image = db.query("select * from productImage where productId="+product.id)
                product_json.product_offer = db.query("select * from offer where productId="+product.id)
                product_json.product_size = db.query("select * from productSize where productId="+product.id)
                
                final_data.append(product_json)
            print final_data
            return json.dumps(final_data) 
        except Exception as e:
            print e
            pyDict = {'code':'201','status':'fail','message':e}            
            response =json.dumps(pyDict)
            return response

#ADD and Update product
class AddUpdateProducts:
    def POST(self,id):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = web.data() # to read raw data
        try:
            if id:
                product_data = db.update("product", where="id="+id,name=data.name,price=data.price,currency=data.currency,categoryId=data.categoryId,is_active=data.is_active,is_available=data.is_available,is_todaysSpecial=data.is_todaysSpecial)
                # Now upload images for the perticular product           
                pyDict = {'code':'200','status':'Successfully updated','message':"Updated Product"}    
                return json.dumps(pyDict) 
            else:
                product_data = db.insert("product",name=data.name,price=data.price,currency=data.currency,categoryId=data.categoryId,is_active=data.is_active,is_available=data.is_available,is_todaysSpecial=data.is_todaysSpecial)
                # Now upload images for the perticular product           
                pyDict = {'code':'200','status':'Successfully added','message':"Inserted New Product"}    
                return json.dumps(pyDict) 
        except Exception as e:
            print e
            pyDict = {'code':'201','status':'fail','message':e}            
            response =json.dumps(pyDict)
            return response

    def OPTIONS(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        return
    def GET(self,categoryId):
        return "Get Method only supported. No Authorization Required"

    

# Category CURD
#Get All Categories
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
            return json.dumps(final_data) 
        except Exception as e:
            print e
            pyDict = {'code':'201','status':'fail','message':e}            
            response =json.dumps(pyDict)
            return response

#ADD and Update Category
class AddUpdateCategories:
    def POST(self,id):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = web.data() # to read raw data
        try:
            if id:
                product_data = db.update("category", where="id="+id,name=data.name,parentId=data.parentId,path=data.path,backgroudImage=data.backgroudImage)
                # Now upload images for the perticular product           
                pyDict = {'code':'200','status':'Successfully updated','message':"Updated Category"}    
                return json.dumps(pyDict) 
            else:
                product_data = db.insert("category",name=data.name,parentId=data.parentId,path=data.path,backgroudImage=data.backgroudImage)
                # Now upload images for the perticular product           
                pyDict = {'code':'200','status':'Successfully added','message':"Inserted New Categry"}    
                return json.dumps(pyDict) 
        except Exception as e:
            print e
            pyDict = {'code':'201','status':'fail','message':e}            
            response =json.dumps(pyDict)
            return response

    def OPTIONS(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        return
    def GET(self,categoryId):
        return "Get Method only supported. No Authorization Required"
            

if __name__ == "__main__": 
    app = web.application(urls, globals())    
    app.run()     
else:
    app = web.application(urls, globals())
    application = app.wsgifunc()
