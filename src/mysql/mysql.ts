import mysql = require('mysql');


export default class MySQL {
    
    private static _instance: MySQL;

    conection: mysql.Connection;
    conectado = false;

    constructor() {
        console.log('Clase inicializada!');

        this.conection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'node_db',
          });

          this.conectarDB();
    }
        

    public static get instance() {
        // Esto quiere decir
        // que cuando llame instance me llama la instancia si no existe me inicializa la clase
        // lo que me haria la conexión a mysql
        return this._instance || (this._instance = new this());
    }

    static ejecutarQuery(query: string, callback: Function) {
        
        this.instance.conection.query(query, (err, results: Object[], field) => {
            
            if(err) {
                console.log('Error en Query');
                console.log(err);
                return callback(err);
            }
            if(results.length === 0) {
                callback('El registro solicitado no exite')
            } else {
                callback(null, results);
            }
        })

    };
        
    private conectarDB() {
        this.conection.connect((err: mysql.MysqlError) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONECTION_LOST') {
                    console.log('DATABASE CONECTION WAS CLOSED');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.log('DATABASE HAS TOO MANY CONECTION');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.log('DATABASE CONECTION WAR REFUSED');
                }
            }
            this.conectado = true;
            console.log('Base de datos Online!');
        })
    }


}