import json, glob, os

generatedHtml = """<table><tr><td>URLs</td><td>Scores</td></tr>"""
def parseJson(path):
    theJson = json.load(open(path, "r", encoding="utf-8"))
    try:
        url = theJson["finalUrl"]
    except Exception as e:
        url = "??? error"
    
    try:
        performanceScore = int(float(theJson["categories"]["performance"]["score"])*100)
    except Exception as e:
        performanceScore = 0
    
    try:
        accessibilityScore = int(float(theJson["categories"]["accessibility"]["score"])*100)
    except Exception as e:
        accessibilityScore = 0
    
    try:
        bestpracticesScore = int(float(theJson["categories"]["best-practices"]["score"])*100)
    except Exception as e:
        bestpracticesScore = 0

    try:
        seoScore = int(float(theJson["categories"]["seo"]["score"])*100)
    except Exception as e:
        seoScore = 0
        
    return (url, performanceScore, accessibilityScore, bestpracticesScore, seoScore)

jsonpath = "lighthouse"
os.chdir(jsonpath)
for report in glob.glob("*.json"):
    info = parseJson(jsonpath+"\\"+report)
    generatedHtml += "<tr><td><a href=\"/lighthouse/"+report[0:len(report)-4]+"html\">"+str(info[0])+"</a></td><td>"+str(info[1])+","+str(info[2])+","+str(info[3])+","+str(info[4])+"</td></tr>"
generatedHtml += "</table>"
print(generatedHtml)
