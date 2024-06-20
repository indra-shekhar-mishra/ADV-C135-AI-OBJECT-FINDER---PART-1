objects = [];
stat = '';
input = '';
abc = 'round 1';
detectedObjects = [];
uniqueLabels = '';
function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function draw()
{
    
    image(video,0,0,380,380);
    console.log("IMPORTANT: "+abc);

        if(stat != "")
    {
        od.detect(video,gotResults);
        for (var i=0;i < objects.length;i++) 
        {
            document.getElementById("statl").innerHTML = "Status : Objects detected";
            document.getElementById("len").innerHTML = "Number of objects detected : "+objects.length;
            document.getElementById('objs').innerHTML="Make sure to reload after your objects are detected to try again"

            fill('red')
            stroke('red')
            percent = floor(objects[i].confidence*100)
            text(objects[i].label+" "+percent+" %",objects[i].x,objects[i].y);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == inpu)
            {
                video.stop();
                noLoop(); 
                document.getElementById("statl").innerHTML = "Status : "+inpu+" found";
                
                var synth = window.speechSynthesis;
                speak_data1 = inpu+" found";
                speak_data3 = "I repeat "+input+"found"
                var ut = new SpeechSynthesisUtterance(speak_data1+speak_data1+speak_data3);
                synth.speak(ut); 
                
            }
            else if(abc == 'round 1'){
                document.getElementById("statl").innerHTML = "Status : "+input+" not found";
                var synth = window.speechSynthesis;
                speak_data2 = input+" not found";
                var ut = new SpeechSynthesisUtterance(speak_data2);
                synth.speak(ut); 
                abc = 'round 2'
                console.log("IMPORTANT: "+abc);
                
                
            }
            else if(abc == 'round 2')
            {
                document.getElementById("statl").innerHTML = "Status : "+input+" not found";
                var synth = window.speechSynthesis;
                speak_data2 = "I repeat "+input+" not found";
                var ut = new SpeechSynthesisUtterance(speak_data2);
                synth.speak(ut); 
                abc = 'round 3'
                console.log("IMPORTANT: "+abc);
            }
            else if(abc == 'round 3')
            {
                document.getElementById("statl").innerHTML = "Status : "+input+" not found";
                var synth = window.speechSynthesis;
                speak_data2 = "For the final time "+input+" not found";
                var ut = new SpeechSynthesisUtterance(speak_data2);
                synth.speak(ut); 
                abc = 'round 4'
                console.log("IMPORTANT: "+abc);
            }
            else if(abc == 'round 3')
            {
                document.getElementById("statl").innerHTML = "Status : "+input+" not found";
                console.log("IMPORTANT: "+"Final round");
            }
        }
        
    }
      }
    
    
    

function preload()
{

}
function star()
{
    od = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("statl").innerHTML = "Status : Objects are being detected";
    inpu = document.getElementById("input").value;
}
function modelLoaded()
{
    console.log("model has been loaded")
    stat = true;
}
function gotResults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results)
        objects = results;

    }
}