var nodes = new vis.DataSet([
        {id: 1, title: '#me', image: 'resources/rdf.png', shape: 'image', url: 'resources/foaf.rdf'},
        {id: 2, title: 'Facebook', image: 'resources/facebook-logo-grey.png', shape: 'image', url: 'https://www.facebook.com/szymon.klarman'},
        {id: 3, title: 'GitHub', image: 'resources/github-8-xxl.png', shape: 'image', url: 'https://github.com/sklarman'},
        {id: 4, title: 'Twitter', image: 'resources/twitter-xxl.png', shape: 'image', url: 'https://twitter.com/szymonklarman'},
        {id: 5, title: 'Google Scholar', image: 'resources/gs.png', shape: 'image', url: 'https://scholar.google.com/citations?user=F-yv6acAAAAJ&hl=pl'},
        {id: 6, title: 'LinkedIn', image: 'resources/in.jpg', shape: 'image', url: 'https://uk.linkedin.com/in/szymon-klarman-a05a0680'},
        {id: 7, title: 'CV', image: 'resources/cv.png', shape: 'image', url: 'resources/Klarman_CV.pdf'},
        {id: 8, title: 'Great, Greater, Greatest...', image: 'resources/moto.png', shape: 'image', url: 'http://wielka-wieksza-najwieksza.yolasite.com'},
        {id: 9, title: 'Blast from the past!', image: 'resources/bass.png', shape: 'image', url: 'http://033258.wixsite.com/cloneoriginal'},
        {id: 10, title: 'SlideShare', image: 'resources/slideshare.png', shape: 'image', url: 'http://slideshare.net/SzymonKlarman'},
        {id: 11, title: 'Medium', image: 'resources/medium.png', shape: 'image', url: 'http://medium.com/@sklarman'}
   ]);
 
   // create an array with edges
   var edges = new vis.DataSet([
        {from: 1, to: 2},
        {from: 1, to: 3},
        {from: 1, to: 4},
        {from: 1, to: 5},
        {from: 1, to: 6},
        {from: 1, to: 7},
        {from: 1, to: 8},
        {from: 1, to: 9},
        {from: 1, to: 10},
        {from: 1, to: 11}
   ]);
 
   // create a network
   var container = document.getElementById('mynetwork');
   var data = {
     nodes: nodes,
     edges: edges
   };
    var options = {
            interaction: {
                hoverConnectedEdges: true,
                hover: true 
            },
            nodes: {
                borderWidth:2,
                size:30,
                color: {
                    border: 'rgba(0,0,0,0)',
                    background: 'rgba(0,0,0,0)',
                    hover: {
                        border: '#de2e2e',
                        background: 'white'
                        },
                    highlight: {
                        border: '#de2e2e',
                        background: 'white'
                        }
                },
                shapeProperties: {
                    useBorderWithImage:true
                }
            },
            edges: {
                color: {
                        highlight: '#de2e2e',
                        hover: '#de2e2e',
                        color: 'Silver'},
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
 
 
    var network = new vis.Network(container, data, options);
 
    function openURL(Node){
        window.open(nodes.get(Node).url)
    };
 
    network.on("click", function (params) {
                         if(params.nodes[0]!=null){
                         openURL(params.nodes[0])
                 }});  

network.once("stabilized", function () { 
     network.fit({animation:{duration:1000, easingFunction:"easeInOutCubic"}, nodes:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11]});    
});
    