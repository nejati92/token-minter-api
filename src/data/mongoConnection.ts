import * as mongo from "mongodb";

export class MongoConnection {
    // tslint:disable-next-line:max-line-length
    private  connectionString: string = "mongodb://necatim:Aslan1905@tracker-shard-00-00-j5xfk.gcp.mongodb.net:27017,tracker-shard-00-01-j5xfk.gcp.mongodb.net:27017,tracker-shard-00-02-j5xfk.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Tracker-shard-0&authSource=admin&retryWrites=true";
    private dbConnection: any = null;
    constructor() {};

    public async openDbConnection() {
        if (this.dbConnection == null) {
            try {
                const client = await mongo.MongoClient.connect(this.connectionString);
                this.dbConnection = client.db("test");
                console.log("Connected correctly to MongoDB server.");
                return this.dbConnection;
            } catch (err) {
                console.log("cannot connect to MongoDB server.");
            }
        }
    }

    public async getLatest(collectionName: any): Promise<any> {
        if (this.dbConnection) {
            try {
                const result = await this.dbConnection.collection(collectionName).find({}).sort({"TimeStamp": -1}).limit(1).toArray();
                return result;
            } catch (err) {
                return Promise.reject(err + "Could not find");
            }
        }
    }
}
