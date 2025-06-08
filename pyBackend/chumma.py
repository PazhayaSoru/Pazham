from pymongo import MongoClient

# Replace with your actual MongoDB connection string and details
MONGODB_URI = "mongodb://localhost:27017"
DB_NAME = "wtdb"
COLLECTION_NAME = "dues"

# Connect to MongoDB
client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# The ID of the document you want to retrieve (replace with your actual ID)
document_id = "661c2e2f8e4b2a1a2b3c4d5e"  # Example ObjectId as a string

# If your _id is an ObjectId, convert it
document = collection.find_one({"user_id":1 })

# If your _id is a string, use this instead:
# document = collection.find_one({"_id": document_id})

print(document)
