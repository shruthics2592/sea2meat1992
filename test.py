import web
import MySQLdb
import json
import datetime
import os
from uuid import UUID
import base64




urls = (
  '/app/getcategory','GetCategories', #Gets all the categories
  '/app/addUpdatecategory','AddUpdateCategories', #Add new category
  '/app/getproduct/?([0-9])*','GetProducts', #Get all products for the selected category or all
  '/admin/addproduct','AddProducts', #add all products for the selected category or all
  '/app/addUpdateproduct/?([0-9])*','AddUpdateProducts', #Get all products for the selected category or all
  '/app/login','Applogin',
  '/admin/login','Adminlogin',
  '/app/register','Register',
  '/admin/register','RegisterAdmin',
  '/app/order','PlaceOrder',
  '/app/order_history','OrderHistory',
  '/app/getbanner','GetBanner', #To get banner images for home page
  '/admin/addbanner','AddBanner',
  '/app/getabout','GetAbout',#get about firm data'
  '/admin/setabout','SetAbout',#set about firm data
  '/app/getfeaturedproducts','GetFeaturedProducts', # Get all the featured products for home page with product type
  '/app/gettestemonials','GetTestemonials', # Get all the feedbacks
  '/admin/settestemonials','SetTestemonials', # Get all the feedbacks
  '/app/getbrand','GetBrandImages', #To get brand images for home page
  '/app/addwish','AddWish', # adds to wish list
  '/admin/getwish','GetWish', # get to wish list
  '/admin/getuser','GetUsers',
  '/admin/addbrand','AddBrand',
  '/app/productDetails/?([0-9]*)','GetaProducts',
  '/app/editaccount','EditAccount',
  '/app/editpassword','EditPassword',
  '/app/getaddress','GetAddress',
  '/app/editaddress','EditAddress',
  '/app/addaddress','AddAddress',
  '/app/updatenewsletter','UpdateNewsletter',
  '/app/getmyorder/?([0-9]*)','GetMyOrder',
  '/app/getallorder','GetAllOrder'


)


# shruthi
# db = web.database(host="127.0.0.1", port=3306 , dbn='mysql' , user="root", pw="Spur2Win", db="seatomeat")
#db = web.database(host="127.0.0.1", port=3306 , dbn='mysql' , user="root", pw="Spur2Win", db="seatomeat")
#live server
db = web.database(host="127.0.0.1", port=3306 , dbn='mysql' , user="root", pw="spur2win", db="seatomeat")
# shubham
#db = web.database(host="127.0.0.1", port=3306 , dbn='mysql' , user="root", pw="root", db="shubham")

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
            userObj = db.query("select * from user where is_admin=0 and email='"+str(data['email'])+"' and password='"+str(data['password'])+"'") 
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
                    userdata["is_admin"] = user.is_admin
                    
                    #userdata["address"] = db.query("select * from address where userId="+str(user.id))
                    pyDict = {'code':'200','status':'user data',"user":userdata} 
                    
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

#Login
class Adminlogin:
    def POST(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = web.data() # to read raw data
        data = json.loads(web.data().decode('utf-8'))
        try:
            userObj = db.query("select * from user where is_admin=1 and email='"+str(data['email'])+"' and password='"+str(data['password'])+"'") 
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
                userdata_data= db.insert("user",firstName=data['firstName'],lastName=data['lastName'],mobile=data['mobile'],fax=data['fax'],email=data['email'],company=data['company'],authtoken=data['authtoken'],subscription=data['subscription'],password=data['password'],is_admin=data['is_admin'])
                user_address = db.insert("address",streetAddress=data['street'],pincode=data['pincode'],city=data['city'],state=data['state'],country=data['country'],addressType="billing",userId=userdata_data)
                data["id"] = userdata_data
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



#Register   
class RegisterAdmin:
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
                data["id"] = userdata_data
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




class EditAccount:
    def POST(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = web.input() # to read raw data
        try:
            userid = ""
            userObj = db.query("select * from user where id='"+data.id+"'") 
            for user in userObj:
                userid = user.id
            if userid:
                
                firstname = data.firstname
                lastname = data.lastname
                mobile = data.mobile
                fax = data.fax
                udpdateAt  = datetime.date.today()
                company = ""
                if "company" in data :
                    company = data.company
                subscription = ""
                if "subscription" in data :
                    subscription = data.subscription
                db.update('user',vars=locals(),where='id=$userid',subscription=subscription,company=company,updatedAt=udpdateAt,FirstName=firstname,LastName=lastname,mobile=str(mobile),fax=str(fax))
                udatedUser = db.query("select * from user where email='"+data.email+"'")
                for updates in udatedUser:
                    my_user = {"id":updates.id,"firstName":updates.firstName,"lastName":updates.lastName,"mobile":updates.mobile,"fax":updates.fax,"email":updates.email,"company":updates.company,"subscription":updates.subscription}
                pyDict = {'code':200,'status':"succes","user":my_user}            
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
    def GET(self):
        return "Get Method only supported. No Authorization Required"




class EditPassword:
    def POST(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = web.input() # to read raw data
        try:
            userid = ""
            userObj = db.query("select * from user where id='"+data.id+"'") 
            for user in userObj:
                userid = user.id
            if userid:
                
                password = data.password
                db.update('user',vars=locals(),where='id=$userid',password=password)
                pyDict = {'code':200,'status':"succes"}            
                return json.dumps(pyDict)
            else:
                pyDict = {'code':201,'status':'user already exist'}
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
    def GET(self):
        return "Get Method only supported. No Authorization Required"



class EditAddress:
    def POST(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = json.loads(web.data())
        try:
            
            addressObj = db.query("select * from address where id='"+str(data['a_id'])+"' and userId="+str(data['u_id'])) 
            for address in addressObj:
                aid = address.id
            uid = data['u_id']
            if aid:
                db.update('address',vars=locals(),where='id=$aid and userId=$uid',streetAddress = data['streetAddress'], pincode = data['pincode'],city= data['city'],state= data['state'],country= data['country'],addressType= data['addressType'])
                pyDict = {'code':200,'status':"succes"}            
                return json.dumps(pyDict)
            else:
                pyDict = {'code':201,'status':'user already exist'}
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
    def GET(self):
        return "Get Method only supported. No Authorization Required"

class AddAddress:
    def POST(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = json.loads(web.data())
        try:
            wishObj = db.insert('address',streetAddress = data['streetAddress'],pincode=data['pincode'],city=data['city'],state=data['state'],country=data['country'],addressType=data['addressType'],userId=data['u_id'])
            pyDict = {'code':'200','status':'success'} 
            
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
    def GET(self):
        return "Get Method only supported. No Authorization Required"
    def DELETE(self):
        data = web.input()
        delete_add = db.query("DELETE FROM address WHERE id = "+str(data.id))

class AddBrand:
    def POST(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = web.input()
        try:
            print "VHVJHV"
            path = os.path.abspath(os.path.join(os.path.dirname( __file__ ))) + "/brand"
            print path
            eachFile =data.image
            filename=path.split('/')[-1]
            timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S%f")
            filename = 'brand_'+str(timestamp)+'_'+filename
            fileData = eachFile
            fout = open(path +'/'+filename, "wb")
            fout.write(fileData)
            fout.close()
            db.insert('brand_images',brand_image=filename)
            pyDict = {'code':'200','status':'success'} 
            
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
    def GET(self):
        return "Get Method only supported. No Authorization Required"


class AddBanner:
    def POST(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = web.input()
        try:
            print "VHVJHV"
            path = os.path.abspath(os.path.join(os.path.dirname( __file__ ))) + "/banner"
            print path
            eachFile =data.image
            filename=path.split('/')[-1]
            timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S%f")
            filename = 'brand_'+str(timestamp)+'_'+filename
            fileData = eachFile
            fout = open(path +'/'+filename, "wb")
            fout.write(fileData)
            fout.close()
            db.insert('banner_images',brand_image=filename)
            pyDict = {'code':'200','status':'success'} 
            
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
    def GET(self):
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



#Get all products for the selected category or all
class AddProducts:
    def GET(self):
        return "Get Method only supported. No Authorization Required"
    def OPTIONS(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        return
    def POST(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        try:
            data = json.loads(web.data())
            createdAt = createdAt = datetime.date.today()
            add_product = db.insert("product",name=data['name'],price=data['price'],currency=data['currency'],categoryId=data['categoryId'],is_available=data['is_available'],is_todaysSpecial=data['is_todaysSpecial'],is_active=data['is_active'],createdAt=createdAt,description=data['description'],sale_price=data['sale_price'],is_sale=data['is_sale'])
            pyDict = {'code':'200','status':'Success','data':add_product}  
            return json.dumps(pyDict) 
        except Exception as e:
            
            
            response = []
            pyDict = {'code':'201','status':'fail','message':str(e)}  
            response.append(pyDict)          
            finalresponse =json.dumps(response)
            return finalresponse



#Get all products for the selected category or all
class GetaProducts:
    def POST(self):
        return "Get Method only supported. No Authorization Required"
    def OPTIONS(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        return
    def GET(self,id):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        try:
            if id:
                product_data = db.select('product',vars=locals(), where='id=$id') 
            else:
                product_data = db.query('Select * from product')
                

            final_data = []
            for product in product_data:
                product_json = {}
                product_json["id"] = product.id
                product_json["productCode"] = product.productCode
                product_json["name"] = product.name
                product_json["price"] = product.price
                product_json["currency"] = product.currency
                product_json["is_active"] = product.is_active
                product_json["is_available"] = product.is_available
                product_json["is_todaysSpecial"] = product.is_todaysSpecial
                product_json["product_image"] = []
                product_json["product_size"] = []
                product_images = db.query("select * from productImage where productId="+str(product.id))
                product_sizes = db.query("select * from productSize where productId="+str(product.id))
                for images in product_images:
                    imagesObj = {}
                    imagesObj["id"]= images.id
                    imagesObj["imagelink"] = images.imagelink
                    imagesObj["swapImage"] = images.swapImage
                    imagesObj["thumbnailImage"] = images.thumbnailImage
                    product_json["product_image"].append(imagesObj)
                for size in product_sizes:
                    sizeObj = {}
                    sizeObj["name"] = size.name
                    sizeObj["price"] = size.price  
                    product_json["product_size"].append(sizeObj)              
                 
                # product_json["product_offer"] = db.query("select * from offer where productId="+str(product.id))
                
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
            if my_name == "TODAY_SPECIAL":
                featured_product_data = db.query('''
                                        select *,p.id as pid from product p
                                        inner join category as c on c.id = p.categoryId
                                        where is_todaysSpecial = true
                                ''') 
            elif my_name=="ALL":
                featured_product_data = db.query('''
                                        select *,p.id as pid from product p
                                        inner join category as c on c.id = p.categoryId
                                        
                                    ''') 
            
            else:
                featured_product_data = db.query('''
                                        select *,p.id as pid from product p
                                        inner join category as c on c.id = p.categoryId
                                        where c.c_name=$id
                                    ''',vars={"id":my_name}) 
                
            final_data = []
            for product in featured_product_data:
                prod_json ={}
                prod_json["id"] =  product.pid
                prod_json["name"] =  product.name
                prod_json["price"] = product.price
                prod_json["currency"] = product.currency
                prod_json["category_name"] = product.c_name
                prod_json["is_available"] = product.is_available
                prod_json["is_todaysSpecial"] = product.is_todaysSpecial
                prod_json["is_active"] = product.is_active
                prod_json["description"] = product.description
                prod_json["is_sale"] = product.is_sale
                prod_json["sale_price"] = product.sale_price
                featured_product_data_image = db.query('''
                                    select * from product p
                                    inner join productImage as pi on p.id = pi.productId
                                    where p.id = $id
                                    LIMIT 1''',vars={"id":product.pid})
                for image in featured_product_data_image:
                    
                    
                    prod_json["imagelink"] = image.imagelink
                    prod_json["swapImage"] = image.swapImage
                    prod_json["thumbnailImage"] = image.thumbnailImage
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


class SetTestemonials:
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
            data = web.input()
            featured_testemonial_data = db.insert("testemonial_data",t_name=data.name,t_proffesion=data.proffesion,t_message=data.message,t_stars=data.stars,t_image=data.image)
            
            pyDict = {'code':'200','status':'Success','data':featured_testemonial_data}  
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
                category_json["id"] = image.id
                final_data.append(category_json)
            
            return json.dumps(final_data) 
        except Exception as e:
            
            pyDict = {'code':'201','status':'fail','message':str(e)}            
            response =json.dumps(pyDict)
            return response


# Get all brand images
class GetBrandImages:
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
                category_json["id"] = image.id
                # category_json["link"] = image.link_to
                final_data.append(category_json)
            
            return json.dumps(final_data) 
        except Exception as e:
            
            pyDict = {'code':'201','status':'fail','message':str(e)}            
            response =json.dumps(pyDict)
            return response

# Get all brand images
class GetUsers:
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
            data = web.input()
            user_data = db.query("select * from user where is_admin="+data.is_admin)
            final_data = []
            for user in user_data:
                user_json = {}
                user_json["id"] = user.id
                user_json["firstName"] = user.firstName
                user_json["lastName"] = user.lastName
                user_json["mobile"] = user.mobile
                user_json["fax"] = user.fax
                user_json["email"] = user.email
                user_json["company"] = user.company
                user_json["subscription"] = user.subscription
                user_json["authtoken"] = user.authToken
                user_json["createdAt"] = user.createdAt
                user_json["updatedAt"] = str(user.updatedAt)
                user_json["is_admin"] = user.is_admin
                final_data.append(user_json)
            
            return json.dumps(final_data) 
        except Exception as e:
            
            pyDict = {'code':'201','status':'fail','message':str(e)}            
            response =json.dumps(pyDict)
            return response

class GetAddress:
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
            data = web.input()
            address_data = db.query("select * from address where userId="+data.id)
            final_data = []
            for address in address_data:
                address_json = {}
                address_json["id"] = address.id
                address_json["streetAddress"] = address.streetAddress
                address_json["pincode"] = address.pincode
                address_json["city"] = address.city
                address_json["state"] = address.state
                address_json["country"] = address.country
                address_json["addressType"] = address.addressType
                address_json["userId"] = address.userId
                final_data.append(address_json)
            
            return json.dumps(final_data) 
        except Exception as e:
            
            pyDict = {'code':'201','status':'fail','message':str(e)}            
            response =json.dumps(pyDict)
            return response

class AddWish:
    def POST(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = web.input() # to read raw data
        try:
            wishObj = db.insert('wishList',productId = data.prod_id,userId=data.user_id)
            pyDict = {'code':'200','status':'success'} 
            
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
    def GET(self):
        return "Get Method only supported. No Authorization Required"

class UpdateNewsletter:
    def POST(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        data = web.input() # to read raw data
        try:
            userid = ""
            userObj = db.query("select * from user where id='"+data.id+"'") 
            for user in userObj:
                userid = user.id
            if userid:
                
                subscription = data.subscription
                db.update('user',vars=locals(),where='id=$userid',subscription=subscription)
                udatedUser = db.query("select * from user where id='"+str(userid)+"'")
                for updates in udatedUser:
                    my_user = {"id":updates.id,"firstName":updates.firstName,"lastName":updates.lastName,"mobile":updates.mobile,"fax":updates.fax,"email":updates.email,"company":updates.company,"subscription":updates.subscription}
                pyDict = {'code':200,'status':"succes","user":my_user}
                return json.dumps(pyDict)
            else:
                pyDict = {'code':201,'status':'user already exist'}
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
    def GET(self):
        return "Get Method only supported. No Authorization Required"

class GetWish:
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
            my_params = web.input()
            user_id = my_params.id
            wish_data = db.query("select * from wishList where userId="+user_id)
            final_data = []
            for wish in wish_data:
                prod_json = {}
                product_id = wish.productId
                featured_product_data = db.query('''
                                    select *,p.id as pid from product p
                                    inner join category as c on c.id = p.categoryId
                                    where p.id=$id
                                ''',vars={"id":product_id}) 
                for product in featured_product_data:
                    prod_json ={}
                    prod_json["id"] =  product.pid
                    prod_json["productCode"] =  product.productCode
                    prod_json["name"] =  product.name
                    prod_json["price"] = product.price
                    prod_json["currency"] = product.currency
                    prod_json["category_name"] = product.c_name
                    prod_json["is_available"] = product.is_available
                    prod_json["is_todaysSpecial"] = product.is_todaysSpecial
                    prod_json["is_active"] = product.is_active
                    prod_json["description"] = product.description
                    prod_json["is_sale"] = product.is_sale
                    prod_json["sale_price"] = product.sale_price
                    featured_product_data_image = db.query('''
                                        select * from product p
                                        inner join productImage as pi on p.id = pi.productId
                                        where p.id=$id
                                        LIMIT 1''',vars={"id":product.pid})
                    for image in featured_product_data_image:
                        prod_json["imagelink"] = image.imagelink
                        prod_json["swapImage"] = image.swapImage
                        prod_json["thumbnailImage"] = image.thumbnailImage
                    final_data.append(prod_json)
            
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

# get about firm data
class SetAbout:
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
            data = web.input()
            about_data = db.insert("about_firm",about_header=data.header,about_body=data.body)
            
            pyDict = {'code':'200','status':'Success','data':about_data}  
            return json.dumps(pyDict)  
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
        data = web.input() # to read raw data
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
        return 0
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
    def GET(self):
        return "Get Method only supported. No Authorization Required"


class GetMyOrder:
    def POST(self):
        return "Get Method only supported. No Authorization Required"
    def OPTIONS(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        return
    def GET(self,id):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','*')
        web.header('Content-Type', 'application/json')
        ordersList =[]
        try:
            orders = db.query("select * from userOrder where userId="+str(id)) 
            for order in orders:
                orderObj = {}
                orderObj["id"] = order.id
                orderObj["userId"] = order.userId
                orderObj["offerId"] = order.offerId
                orderObj["orderStatus"] = order.orderStatus
                orderObj["orderValue"] = order.orderValue
                orderObj["createdAt"] = str(order.createdAt)
                orderObj["addressId"]=order.addressId
                orderObj["addressDeatils"] = {}
                orderObj["products"] = []
                user_address = db.query("select * from address where id="+str(order.addressId))
                for address in user_address:
                    orderObj["addressDeatils"]["streetAddress"] = address.streetAddress
                    orderObj["addressDeatils"]["city"] = address.city
                    orderObj["addressDeatils"]["state"] = address.state
                    orderObj["addressDeatils"]["country"] = address.country
                    orderObj["addressDeatils"]["pincode"] = address.pincode
                orderProduct = db.query("select * from orderProduct where orderId ="+str(order.id))
                for product in  orderProduct:
                    eachproduct = {}
                    myproduct = db.query("select * from product where id="+str(product.productId))
                    for eachpro in myproduct:
                        prod_json ={}
                        prod_json["quantity"] = product.quantity
                        prod_json["id"] =  eachpro.id
                        prod_json["productCode"] = eachpro.productCode
                        prod_json["name"] =  eachpro.name
                        prod_json["price"] = eachpro.price
                        prod_json["currency"] = eachpro.currency
                        prod_json["is_available"] = eachpro.is_available
                        prod_json["is_todaysSpecial"] = eachpro.is_todaysSpecial
                        prod_json["is_active"] = eachpro.is_active
                        prod_json["description"] = eachpro.description
                        prod_json["is_sale"] = eachpro.is_sale
                        prod_json["sale_price"] = eachpro.sale_price
                        featured_product_data_image = db.query('''
                                            select * from product p
                                            inner join productImage as pi on p.id = pi.productId
                                            where p.id = $id
                                            LIMIT 1''',vars={"id":eachpro.id})
                        for image in featured_product_data_image:
                            prod_json["imagelink"] = image.imagelink
                            prod_json["swapImage"] = image.swapImage
                            prod_json["thumbnailImage"] = image.thumbnailImage
                        orderObj["products"].append(prod_json)
                ordersList.append(orderObj)
            pyDict = {'code':'200','status':'Success','Orders':ordersList}  
            return json.dumps(pyDict)  
        except Exception as e:
            
            pyDict = {'code':'201','status':'fail','message':str(e)}            
            response =json.dumps(pyDict)
            return response
        

class GetAllOrder:
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
        ordersList =[]
        try:
            orders = db.query("select * from userOrder") 
            for order in orders:
                orderObj = {}
                orderObj["id"] = order.id
                orderObj["userId"] = order.userId
                orderObj["offerId"] = order.offerId
                orderObj["orderStatus"] = order.orderStatus
                orderObj["addressId"]=order.addressId
                orderObj["addressDeatils"] = {}
                orderObj["products"] = []
                user_address = db.query("select * from address where id="+str(order.addressId))
                for address in user_address:
                    orderObj["addressDeatils"]["streetAddress"] = address.streetAddress
                    orderObj["addressDeatils"]["city"] = address.city
                    orderObj["addressDeatils"]["state"] = address.state
                    orderObj["addressDeatils"]["country"] = address.country
                    orderObj["addressDeatils"]["pincode"] = address.pincode
                orderProduct = db.query("select * from orderProduct where orderId ="+str(order.id))
                for product in  orderProduct:
                    eachproduct = {}
                    myproduct = db.query("select * from product where id="+str(product.productId))
                    for eachpro in myproduct:
                        prod_json ={}
                        prod_json["quantity"] = product.quantity
                        prod_json["id"] =  eachpro.id
                        prod_json["name"] =  eachpro.name
                        prod_json["price"] = eachpro.price
                        prod_json["currency"] = eachpro.currency
                        prod_json["is_available"] = eachpro.is_available
                        prod_json["is_todaysSpecial"] = eachpro.is_todaysSpecial
                        prod_json["is_active"] = eachpro.is_active
                        prod_json["description"] = eachpro.description
                        prod_json["is_sale"] = eachpro.is_sale
                        prod_json["sale_price"] = eachpro.sale_price
                        featured_product_data_image = db.query('''
                                            select * from product p
                                            inner join productImage as pi on p.id = pi.productId
                                            where p.id = $id
                                            LIMIT 1''',vars={"id":eachpro.id})
                        for image in featured_product_data_image:
                            prod_json["imagelink"] = image.imagelink
                            prod_json["swapImage"] = image.swapImage
                            prod_json["thumbnailImage"] = image.thumbnailImage
                        orderObj["products"].append(prod_json)
                ordersList.append(orderObj)
            pyDict = {'code':'200','status':'Success','Orders':ordersList}  
            return json.dumps(pyDict)  
        except Exception as e:
            
            pyDict = {'code':'201','status':'fail','message':str(e)}            
            response =json.dumps(pyDict)
            return response
        

class PlaceOrder:
    def POST(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','Content-Type')
        web.header('Access-Control-Request-Headers','Content-Type')
        # web.header('Content-Type', 'application/json')
        data =json.loads(web.data())# to read raw data   
        try:
            createdAt = str(datetime.datetime.now())
            delivaryDate = str(datetime.datetime.now().date())
            orderStatus = "Fail"
            #cart_id = db.query("Insert into order (userId, orderValue, orderStatus,addressId, paymentMethod) values ("+str(data['userId'])+","+str(data['orderValue'])+",'"+data['orderStatus']+"',"+str(data['addressId'])+",'COD')")
            cart_id = db.insert('userOrder',userId = data['userId'],orderValue=data['orderValue'],orderStatus=data['orderStatus'],addressId=data['addressId'],paymentMethod='COD')            
            for products in data["cart"]:
                db.insert('orderProduct',orderId=cart_id,productId=products['productId'],quantity=products['quantity'],createdAt=createdAt)
            if cart_id:
                orderStatus = "Placed"
            db.insert('orderHistory',orderId=cart_id,orderStatus=orderStatus,createdAt=createdAt)
            
            pyDict = {'code':'200','status':'Successfully updated','message':"Updated Category"}    
            return json.dumps(pyDict)  
        except Exception as e:
            
            pyDict = {'code':'201','status':'fail','message':str(e)}            
            response =json.dumps(pyDict)
            return response

    def OPTIONS(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Methods','*')
        web.header('Access-Control-Allow-Headers','Content-Type')
        web.header('Access-Control-Request-Headers','Content-Type')

        return "Options Method only supported. No Authorization Required"
    def GET(self):
        return "Get Method only supported. No Authorization Required"
if __name__ == "__main__": 
    app = web.application(urls, globals())    
    app.run()     
else:
    app = web.application(urls, globals())
    application = app.wsgifunc()
