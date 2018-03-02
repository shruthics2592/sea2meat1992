import web
import MySQLdb
import json
import datetime






urls = (
  '/app/getcategory','GetCategories', #Gets all the categories
  '/app/addUpdatecategory','AddUpdateCategories', #Add new category
  '/app/getproduct/?([0-9])*','GetProducts', #Get all products for the selected category or all
  '/app/addUpdateproduct/?([0-9])*','AddUpdateProducts', #Get all products for the selected category or all
  '/app/login','Applogin',
  '/app/register','Register',
  '/app/order','PlaceOrder',
  '/app/order_history','OrderHistory',
  '/app/getbanner','GetBanner', #To get banner images for home page
  '/app/getabout','GetAbout',#get about firm data'
  '/app/getfeaturedproducts','GetFeaturedProducts', # Get all the featured products for home page with product type
  '/app/gettestemonials','GetTestemonials', # Get all the feedbacks
  '/app/getbrand','GetBrand', #To get brand images for home page



)


# shruthi
db = web.database(host="127.0.0.1", port=3306 , dbn='mysql' , user="root", pw="Spur2Win", db="seatomeat")
# shubham
#db = web.database(host="127.0.0.1", port=3306 , dbn='mysql' , user="root", pw="root", db="new_schema")

#User Registration and Login
#Login
class Applogin:
    def POST(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = web.data() # to read raw data
        data = json.loads(web.data().decode('utf-8'))
        try:
            userObj = db.query("select * from user where email='"+str(data['email'])+"' and password='"+str(data['password'])+"'") 
            if userObj:
                userdata = {}
                for user in userObj:
                    userdata["id"] = user.id
                    userdata["firstName"] = user.firstName
                    userdata["lastName"] = user.lastName
                    userdata["mobile"] = user.mobile
                    userdata["fax"] = user.fax
                    userdata["email"] = user.email
                    userdata["company"] = user.company
                    userdata["subscription"] = user.subscription
                    userdata["authtoken"] = user.authToken
                    #userdata["address"] = db.query("select * from address where userId="+str(user.id))
                    pyDict = {'code':'200','status':'user data',"user":userdata} 
                    print(pyDict)           
                    return json.dumps(pyDict)
            else:
                pyDict = {'code':201,'status':'user is invalid',"user":{}}
                return json.dumps(pyDict)            


        except Exception as e:
            
            pyDict = {'code':201,'status':'','failmessage':str(e)}            
            response =json.dumps(pyDict)
            return response

    def OPTIONS(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        return 0
    def GET(self,categoryId):
        return "Get Method only supported. No Authorization Required"

#Register   
class Register:
    def POST(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = web.data() # to read raw data
        data = json.loads(web.data().decode('utf-8'))
        try:
            userObj = db.query("select * from user where email='"+data['email']+"'") 
            if not userObj:
                data['authtoken'] = "token"
                userdata_data= db.insert("user",firstName=data['firstName'],lastName=data['lastName'],mobile=data['mobile'],fax=data['fax'],email=data['email'],company=data['company'],authtoken=data['authtoken'],subscription=data['subscription'],password=data['password'])
                user_address = db.insert("address",streetAddress=data['street'],pincode=data['pincode'],city=data['city'],state=data['state'],country=data['country'],addressType="billing",userId=userdata_data)
                pyDict = {'code':200,'status':"succes",'user':data}            
                return json.dumps(pyDict)
            else:
                pyDict = {'code':201,'status':'user already exist',"user":{}}
                return json.dumps(pyDict)            


        except Exception as e:
            pyDict = {'code':201,'status':'','failmessage':str(e)}            
            response =json.dumps(pyDict)
            return response

    def OPTIONS(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        return 0
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
                product_data = db.select('product',vars=locals(), where='categoryId=$categoryId') 
            else:
                product_data = db.query('Select * from product')
                

            final_data = []
            for product in product_data:
                product_json = {}
                product_json["id"] = product.id
                product_json["name"] = product.name
                product_json["price"] = product.price
                product_json["currency"] = product.currency
                product_json["categoryId"] = product.categoryId
                product_json["createdAt"] = product.createdAt
                product_json["is_active"] = product.is_active
                product_json["is_available"] = product.is_available
                product_json["is_todaysSpecial"] = product.is_todaysSpecial
                product_json["product_image"] = db.query("select * from productImage where productId="+str(product.id))
                # product_json["product_offer"] = db.query("select * from offer where productId="+str(product.id))
                product_json["product_size"] = db.query("select * from productSize where productId="+str(product.id))
                
                final_data.append(product_json)
            pyDict = {'code':'200','status':'Success','data':final_data}  
            return json.dumps(pyDict) 
        except Exception as e:
            
            
            response = []
            pyDict = {'code':'201','status':'fail','message':str(e)}  
            response.append(pyDict)          
            finalresponse =json.dumps(response)
            return finalresponse

class GetFeaturedProducts:
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
        try:
            post_data = web.input(name="")
            my_name = post_data.name
            featured_product_data = db.query('''
                                    select * from product p
                                    inner join category as c on c.id = p.categoryId
                                    where c.c_name=$id
                                ''',vars={"id":my_name}) 
            final_data = []
            for product in featured_product_data:
                prod_json ={}
                prod_json["name"] =  product.name
                prod_json["price"] = product.price
                prod_json["currency"] = product.currency
                prod_json["category_name"] = product.c_name
                prod_json["is_available"] = product.is_available
                prod_json["is_todaysSpecial"] = product.is_todaysSpecial
                prod_json["is_active"] = product.is_active
                featured_product_data_image = db.query('''
                                    select * from product p
                                    inner join productImage as pi on p.id = pi.productId
                                    inner join category as c on c.id = p.categoryId
                                    where c.c_name='BEEF'
                                    LIMIT 1''',vars={"id":product.name})
                for image in featured_product_data_image:
                    prod_json["image"] = image.imagelink
                final_data.append(prod_json)
            pyDict = {'code':'200','status':'Success','data':final_data}  
            return json.dumps(pyDict) 
        except Exception as e:
            
            
            response = []
            pyDict = {'code':'201','status':'fail','message':str(e)}  
            response.append(pyDict)          
            finalresponse =json.dumps(response)
            return finalresponse

class GetTestemonials:
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
        try:
            featured_testemonial_data = db.query('''
                                    select * from testemonial_data
                                ''') 
            final_data = []
            for testemonial_data in featured_testemonial_data:
                teste_json ={}
                teste_json["name"] =  testemonial_data.t_name
                teste_json["profession"] = testemonial_data.t_proffesion
                teste_json["message"] = testemonial_data.t_message
                teste_json["stars"] = testemonial_data.t_stars
                teste_json["image_url"] = testemonial_data.t_image
                final_data.append(teste_json)
            pyDict = {'code':'200','status':'Success','data':final_data}  
            return json.dumps(pyDict) 
        except Exception as e:
            
            
            response = []
            pyDict = {'code':'201','status':'fail','message':str(e)}  
            response.append(pyDict)          
            finalresponse =json.dumps(response)
            return finalresponse


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
            
            return json.dumps(final_data) 
        except Exception as e:
            
            pyDict = {'code':'201','status':'fail','message':e}            
            response =json.dumps(pyDict)
            return response
# Get all banner images
class GetBanner:
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
            image_data = db.query("select * from banner_images")
            final_data = []
            for image in image_data:
                category_json = {}
                category_json["category_backgroudImage"] = image.banner_images
                category_json["image_to"] = image.link_to
                final_data.append(category_json)
            
            return json.dumps(final_data) 
        except Exception as e:
            
            pyDict = {'code':'201','status':'fail','message':str(e)}            
            response =json.dumps(pyDict)
            return response


# Get all brand images
class GetBrand:
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
        try:
            image_data = db.query("select * from brand_images")
            final_data = []
            for image in image_data:
                category_json = {}
                category_json["image"] = image.brand_image
                final_data.append(category_json)
            
            return json.dumps(final_data) 
        except Exception as e:
            
            pyDict = {'code':'201','status':'fail','message':str(e)}            
            response =json.dumps(pyDict)
            return response
# get about firm data
class GetAbout:
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
            about_data = db.query("select * from about_firm order by id desc LIMIT 1")
            final_data = []
            for about in about_data:
                about_json = {}
                about_json["header"] = about.about_header
                about_json["body"] = about.about_body
                final_data.append(about_json)
            
            return json.dumps(final_data) 
        except Exception as e:
            
            pyDict = {'code':'201','status':'fail','message':str(e)}            
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

class OrderHistory:
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

class PlaceOrder:
    def POST(self,id):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = web.data() # to read raw data
        try:
            createdAt = datetime.date.today()
            orderStatus = "Fail"
            cart_id = db.insert("order",userId=data.userId,orderValue=data.orderValue,offerId=data.offerId,createdAt=createdAt,orderStatus=data.orderStatus,delivaryDate=data.delivaryDate)
            for products in data.cart:
                db.insert("orderProduct",orderId=cart_id,productId=products.productId,quantity=products.quantity,productSizeId=products.productSizeId,offerId=products.offerId,createdAt=createdAt)
            if cart_id:
                orderStatus = "Placed"
            db.insert("orderHistory",orderId=cart_id,orderStatus=orderStatus,createdAt=createdAt)
            
            pyDict = {'code':'200','status':'Successfully updated','message':"Updated Category"}    
            return json.dumps(pyDict)  
        except Exception as e:
            
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
