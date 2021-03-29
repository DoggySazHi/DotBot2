using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DotBot2
{
    public class DotBotConfig
    {
        [JsonProperty] public string MySqlServer { get; private set; }
        [JsonProperty] public int MySqlPort { get; private set; }
        [JsonProperty] public string MySqlPassword { get; private set; }
        public string MySqlConnection =>
            $"server={MySqlServer};user=DotBotWeb;database=DotBot;port={MySqlPort};password={MySqlPassword}";
        [JsonIgnore] public JObject RawData { get; }
        
        public DotBotConfig(string file = "config.json")
        {
            var json = File.ReadAllText(file);
            JsonConvert.PopulateObject(json, this);
            RawData = JObject.Parse(json);
            File.WriteAllText(file, JsonConvert.SerializeObject(this, Formatting.Indented));
        }
    }
}