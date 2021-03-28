using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DotBot2.Controllers
{
    // mostly forked from Modulr.
    [ApiController]
    [Route("/{**page}")]
    public class MainController : HTMLController
    {
        public MainController(ILogger<HTMLController> logger, DotBotConfig config) : base(logger, config)
        {
            
        }

        protected override void SetupRouter()
        {
            Router.Clear();
            
            Router.Add("", "StaticViews/views/index.html");
            Router.Add("home", "StaticViews/views/index.html");

            AddFolderToRouter("", "StaticViews/img");

            // All other files
            AddFolderToRouter("", "StaticViews/views");
            AddFolderToRouter("img", "StaticViews/img");
            AddFolderToRouter("js", "StaticViews/js");
            AddFolderToRouter("css", "StaticViews/css");
        }
    }
}