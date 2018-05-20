function readFun()
{
    var dataset=[];
    if(document.getElementsByName("qus1")[0].checked)
        dataset.push(8);
    else
        dataset.push(0);
    if(document.getElementsByName("qus2")[0].checked)
        dataset.push(9);
    else
        dataset.push(0);
    if(document.getElementsByName("qus3")[0].checked)
        dataset.push(9);
    else
        dataset.push(0);
    if(document.getElementsByName("qus4")[0].checked)
        dataset.push(8);
    else
        dataset.push(0);
    if(document.getElementsByName("qus5")[0].checked)
        dataset.push(9);
    else
        dataset.push(0);
    if(document.getElementsByName("qus6")[0].checked)
        dataset.push(9);
    else
        dataset.push(0);
    if(document.getElementsByName("qus7")[0].checked)
        dataset.push(6);
    else
        dataset.push(0);
    if(document.getElementsByName("qus8")[0].checked)
        dataset.push(8);
    else
        dataset.push(0);
    if(document.getElementsByName("qus9")[0].checked)
        dataset.push(9);
    else
        dataset.push(0);
        console.log(dataset);
        var s=0;
        for(i=0;i<dataset.length;i++)
        {
            s=s+dataset[i];
        }
        console.log(s);
        writeUserData(parseInt(Math.random()*100), dataset);
        if(s>50)
            document.getElementById("reading").innerHTML="There is a possibility that your child may be affected with dyslexia";
        else
        document.getElementById("reading").innerHTML="Your child does not seem to have problems with reading";
        document.getElementById("read").hidden=true;
        document.getElementById("write").disabled=false;
}
function writeFun()
{
    var dataset=[];
    if(document.getElementsByName("wrt1")[0].checked)
        dataset.push(8);
    else
        dataset.push(0);
    if(document.getElementsByName("wrt2")[0].checked)
        dataset.push(8);
    else
        dataset.push(0);
    if(document.getElementsByName("wrt3")[0].checked)
        dataset.push(8);
    else
        dataset.push(0);
    if(document.getElementsByName("wrt4")[0].checked)
        dataset.push(9);
    else
        dataset.push(0);
    if(document.getElementsByName("wrt5")[0].checked)
        dataset.push(7);
    else
        dataset.push(0);
    if(document.getElementsByName("wrt6")[0].checked)
        dataset.push(9);
    else
        dataset.push(0);
    if(document.getElementsByName("wrt7")[0].checked)
        dataset.push(9);
    else
        dataset.push(0);
    if(document.getElementsByName("wrt8")[0].checked)
        dataset.push(8);
    else
        dataset.push(0);
    if(document.getElementsByName("wrt9")[0].checked)
        dataset.push(9);
    else
        dataset.push(0);
        var s=0;
        for(i=0;i<dataset.length;i++)
        {
            s=s+dataset[i];
        }
        console.log(s);
        if(s>50)
            console.log(1);
        else
            console.log(0);
        console.log(dataset);
        writeUserData(parseInt(Math.random()*100), dataset);
        if(s>50)
            document.getElementById("writeing").innerHTML="There is a possibility that your child may be affected with dygraphia";
        else
        document.getElementById("writeing").innerHTML="Your child does not seem to have trouble with writing";
        document.getElementById("write").hidden=true;
        document.getElementById("math").disabled=false;
}
function mathFun()
{
    var dataset=[];
    if(document.getElementsByName("mat1")[0].checked)
        dataset.push(9);
    else
        dataset.push(0);
    if(document.getElementsByName("mat2")[0].checked)
        dataset.push(9);
    else
        dataset.push(0);
    if(document.getElementsByName("mat3")[0].checked)
        dataset.push(9);
    else
        dataset.push(0);
    if(document.getElementsByName("mat4")[0].checked)
        dataset.push(9);
    else
        dataset.push(0);
    if(document.getElementsByName("mat5")[0].checked)
        dataset.push(7);
    else
        dataset.push(0);
    if(document.getElementsByName("mat6")[0].checked)
        dataset.push(8);
    else
        dataset.push(0);
    if(document.getElementsByName("mat7")[0].checked)
        dataset.push(7);
    else
        dataset.push(0);
    if(document.getElementsByName("mat8")[0].checked)
        dataset.push(8);
    else
        dataset.push(0);
    if(document.getElementsByName("mat9")[0].checked)
        dataset.push(7);
    else
        dataset.push(0);
    if(document.getElementsByName("mat10")[0].checked)
        dataset.push(6);
    else
        dataset.push(0);
        var s=0;
        for(i=0;i<dataset.length;i++)
        {
            s=s+dataset[i];
        }
        writeUserData(parseInt(Math.random()*100), dataset);
        var per=(s*100)/81;
        console.log(s);
        if(s>50)
            document.getElementById("maths").innerHTML="There is a possibility that your child may be affected with dyscalculia";
        else
        document.getElementById("maths").innerHTML="Your child does not seem to have trouble with calculations";
        console.log(dataset);
        document.getElementById("math").hidden=true;
}
function runPyScript(input){
        var jqXHR = $.ajax({
            type: "POST",
            url: "~/login",
            async: true,
            data: { param: input }
        });

        return jqXHR.responseText;
    }

    $('#submitbutton').click(function(){
        datatosend = 'this is my matrix';
        result = runPyScript(datatosend);
        console.log('Got back ' + result);
    });

    
    var database = firebase.database();
    function writeUserData(userId, dataset) {
        firebase.database().ref('users/' + userId).set({
          data:dataset
        });
      }