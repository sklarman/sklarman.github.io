function createVis( type, id ) {

    var baseId = id + '-vis';
    var elem = document.getElementById(baseId);

    elem.innerHTML="";

    if (type=='ccs') {
        $( "#"+ baseId ).append( $( "<div class=\"acmDiv\"><a href=\"https://www.acm.org/publications/class-2012\">ACM CCS</a> classification for keywords: <i id=\""+id+"_keywords\">..</i>. </div> ") );
    }

    if (type=='rdf') {
        $( "#"+ baseId ).append( $( "<div class=\"acmDiv\">Sources: <a href=\"http://klarman.me\">http://klarman.me</a>, <a href=\"http://dblp.org\">http://dblp.org</a>.</div> ") ); //, <a href=\"http://dblp.l3s.de\">http://dblp.l3s.de</a>
    }

    var newId = baseId + '-div';
    
    var mydiv = document.createElement('div');
    mydiv.setAttribute("id", newId);
    mydiv.setAttribute("class", "visualisation");

    elem.appendChild(mydiv);
    mydiv.innerHTML ="<i style=\"color:grey;font-weight:200;\">Loading data, please wait... </i>";

    if (type=='rdf') {
        $( "#"+ baseId ).append( $( "<div class=\"closeDiv\">[<a onclick=\"closeMe('"+baseId+"');\">close</a>]</div> ") );
    }
    if (type=='ccs') {
        $( "#"+ baseId ).append( $( "<div class=\"poweredDiv\">[Powered by <a href=\"/proving-ground/matchmaker-info\">matchmaker</a>]</div> ") );    
        $( "#"+ baseId ).append( $( "<div class=\"closeDiv\">[<a onclick=\"closeMe('"+baseId+"');\">close</a>]</div> ") );    
    }
            
   $.get( type + '/' + id ).done(function( data ) {
        
    var nodes = new vis.DataSet(data.nodes);
    var edges = new vis.DataSet(data.edges);
    
    if(type=="ccs") createCcsVis(data, mydiv, id, nodes, edges);
    if(type=="rdf") createRdfVis(newId, id, nodes, edges);

    });
}




function closeMe ( id ) {

    var elem = document.getElementById(id);
    elem.innerHTML="";
    
}

 
function getRdfOptions() {       
    
var rdfOptions = {
    interaction: {
        hoverConnectedEdges: true,
        hover: true 
    },
    groups: {
        useDefaultGroups: false,
        "1": {
            shape: 'box',
            color: {
                background: 'white'
            }
        },
        "2": {
            shape: 'diamond', 
            size: 10,
            font: {
                size: 20,
                strokeWidth: 4
            }
        }
      },
    nodes: {
        borderWidth: 2,
        size:10,
        color: {
            border: 'grey',
            hover: {
                border: '#de2e2e',
                background: 'white'
                },
            highlight: {
                border: '#de2e2e',
                background: 'white'
                }
        }
    },
    edges: {
        arrows: 'to',
        color: {
                highlight: '#de2e2e',
                hover: '#de2e2e',
                color: 'grey'},
        selectionWidth: 0.4,
        "smooth": {
            "forceDirection": "none" 
        },
        width: 3
    },
    "physics": {
        "minVelocity": 0.5,
        stabilization: false
    }
};

return rdfOptions;

};

function createRdfVis(newId, id, nodes, edges) {
    var container = document.getElementById(newId);
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = getRdfOptions();
    
    
    var network = new vis.Network(container, data, options);

    network.on("click", function (params) {
        if(params.nodes[0]!=null){
            var openNode = data.nodes.get(params.nodes[0]);
            if (openNode.group=="2") {
                window.open(openNode.id)
                }
    }});  
            
}

function createCcsVis (data, mydiv, id, nodes, edges)
{
    var keys = document.getElementById(id + "_keywords");
    keys.innerHTML = data.keywords;

    mydiv.innerHTML = "";

    unfoldNode("http://klarman.me#0", mydiv);

    function unfoldNode ( parentId, parelem ) {

        var item = nodes.get(parentId);

        var pardiv = document.createElement('div');
        pardiv.setAttribute("class", "ccs");
        parelem.appendChild(pardiv);

        if (parentId != "http://klarman.me#0") {
            pardiv.setAttribute("style", "margin-left: 50px;");
            if (item.title) pardiv.setAttribute("title", item.title);
            pardiv.innerHTML = "<b style=\"color: #de2e2e;\">&rarrhk;</b> " + item.label;
        } else {
            pardiv.innerHTML = item.label;
        }

        edges.get({
            filter: function (item) {
                if (item.to == parentId) {
                var child = nodes.get(item.from);
                var newChildNode = unfoldNode(child.id, pardiv);
            };
        }})
        
    }

}