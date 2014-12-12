$(window).load(function(){

  //callback to open each tab after the PerspectivesLoadedEvent gets fired
  var callback = function(args) {
    setTimeout(function(){
      fetchAndOpenTabs();
    }, 3000);
  };

  //add the handler as soon as it becomes available
  var functionTimed = function(){
    if(typeof mantle_openTab != "undefined"){
      window.clearInterval(timeoutMangeOpenTab);
      callback();
    } else {
      if(typeof mantle_addHandler != "undefined"){
        window.top.mantle_addHandler("PerspectivesLoadedEvent", callback);
        window.clearInterval(timeoutMangeOpenTab);
      } else {
        //set runs interval again
      }
    }
  };

  var timeoutMangeOpenTab = setInterval(functionTimed, 100);

  var fetchAndOpenTabs = function(){
    var tabs;
    $.ajax({
      type: "GET",
      url: CONTEXT_PATH + "plugin/cst/api/readConfigOnce",
      dataType: "json",
      success: function(data){
        if(data.resultset){
          var mode = _.uniq(_.map(data.resultset, function(row){
            return row[4];
          }));
          //console.log("CST: " + JSON.stringify(mode));
          if (mode[0] == "launcher"){
            window.top.mantle_openTab('CST', 'Community Startup Tabs',  CONTEXT_PATH + "plugin/cst/api/launcher");
          } else {
            var tabsCount = data.queryInfo.totalRows;
            $.each(data.resultset, function(i, tab){
              if(tab[2]){
                if(tabsCount == 1){
                  window.location.href = tab[3];
                } else {
                  window.open(tab[3], tab[1]);
                }
              } else {
                window.top.mantle_openTab(tab[0], tab[1], tab[3]);
              }
            });
          }
          $($(".pentaho-tab-deck-panel iframe")[0]).load(function(){
            setTimeout(function(){
              $($(".pentaho-tab-bar .pentaho-tabWidget")[0]).mouseup();
            }, 1000);
          });
        }
      }
    });
  };
});
