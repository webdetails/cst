$(window).load(function(){

  //callback to open each tab after the PerspectivesLoadedEvent gets fired
  var callback = function(args) {
    setTimeout(function(){
      fetchAndOpenTabs();

      window.top.mantle_setPerspective('opened.perspective');
    }, 2000);
  };

  //add the handler as soon as it becomes available
  var functionTimed = function(){
    if(typeof mantle_addHandler != "undefined"){
       window.top.mantle_addHandler("PerspectivesLoadedEvent", callback);
       window.clearInterval(timeoutMangeOpenTab);
    }
  };

  var timeoutMangeOpenTab = setInterval(functionTimed, 100);

  var fetchAndOpenTabs = function(){
    var tabs;
    $.ajax({
      type: "GET",
      url: CONTEXT_PATH + "plugin/cst/api/readConfig",
      dataType: "json",
      success: function(data){
        if(data.resultset){
          for(var i = 0; i < data.queryInfo.totalRows; i++){
            var tab = data.resultset[i];

            var tabMatchType = tab[0],
                tabMatchValue = tab[2],
                tabName = tab[3],
                tabTooltip = tab[4],
                tabIsFullScreen = tab[6],
                tabLink = tab[7];

            switch(tabMatchType){
              case "USER": {
                var regex = new RegExp(tabMatchValue);
                if(regex.test(SESSION_NAME)) {
                  window.top.mantle_openTab(tabName, tabTooltip, tabLink);
                }
                break;
              }
              case "ROLE": {
                $.ajax({
                  type: "GET",
                  url: CONTEXT_PATH + "api/userroledao/userRoles?userName=" + SESSION_NAME,
                  dataType: "json",
                  success: function(data){
                    if(data.roles){
                      for(var j = 0; j < data.roles.length; j++){
                        var regex = new RegExp(tabMatchValue);
                        if(regex.test(data.roles[j])) {
                          window.top.mantle_openTab(tabName, tabTooltip, tabLink);
                          break;
                        }
                      }
                    }
                  }
                });
                break;
              }
              case "DEFAULT": {
                window.top.mantle_openTab(tabName, tabTooltip, tabLink);
                break;
              }
            }
          }
        }
      }
    });
  };
});

