import web
import MySQLdb







urls = (
  '/delaytest','delaytest',



)



db = web.database(host="127.0.0.1", port="3306" , dbn='mysql' , user="root", pw="root", db="new_schema")


class delaytest:
    def GET(self):
        try:
            return "Its working"
        except Exception as e:
            print e
            return e

if __name__ == "__main__": 
    app = web.application(urls, globals())    
    app.run()     
else:
    app = web.application(urls, globals())
    application = app.wsgifunc()


