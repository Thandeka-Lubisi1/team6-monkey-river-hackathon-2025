using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BackEnd.Models
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        public async Task<bool> PingAsync()
        {
            try
            {
                var result = await _database.RunCommandAsync((Command<BsonDocument>)"{ping:1}");
                return result != null;
            }
            catch
            {
                return false;
            }
        }
    }
}
