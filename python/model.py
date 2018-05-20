from csv import reader as csvreader
import random
import math

################## Load the csv file ##################################

def loadcsv(filename):
        try:
                with open(filename, 'r') as fp:
                    reader = csvreader(fp)
                    dataset = list(reader)
                    for i in range(len(dataset)):
                            dataset[i] = [float(x) for x in dataset[i]]
                    
                    return dataset
        except:
                main()

################## Split the data into train and test #################

def splitDataset(dataset,splitRatio):
    trainSize = int(len(dataset) * splitRatio)
    trainSet = []
    copy = list(dataset)
    while len(trainSet) < trainSize:
        index = random.randrange(len(copy))
        trainSet.append(copy.pop(index))
    return [trainSet, copy]

################## Separate instances using Class Value ###############    

def separateByClass(dataset):
    separated = {}
    print(len(dataset))
    for i in range(len(dataset)):
        vector = dataset[i]
        if (vector[-1] not in separated):
                separated[vector[-1]] = []
        separated[vector[-1]].append(vector)
        #separated will having two vector one vector will have set of output value 1
        #and second will have output value 0
    print(len(separated[0]),len(separated[1]))
    return separated  

################## Mean of an attribute ###############################    
def mean(numbers):
    try:
            return sum(numbers)/float(len(numbers))
    except:
            main()

################## Standard Deviation of an attribute #################    

def stdev(numbers):
    try:
            avg = mean(numbers)
            variance = sum([pow(x-avg,2) for x in numbers])/float   (len(numbers)-1)
            return math.sqrt(variance)
    except:
            main()

################## Summarize the mean and stdev #######################    

def summarize(dataset):
    summaries = [(mean(attribute), stdev(attribute)) for attribute in zip(*dataset)]
#summaries will have mean and standard deviation
    del summaries[-1]
#will delete output value 1 from summaries
    return summaries

################## Summarize with Class Value #########################    

def summarizeByClass(dataset):
    separated = separateByClass(dataset)
    summaries = {}
    #class value will be either 0 or 1
    for classValue, instances in separated.items():
        summaries[classValue] = summarize(instances)
    return summaries

################## Gaussian Probability Density Function ##############    

def calculateProbability(x,mean,stdev):
    try:
            exponent = math.exp(-(math.pow(x-mean,2)/(2*math.pow(stdev,2))))
            return (1/(math.sqrt(2*math.pi)*stdev)) * exponent
    except:
            main()

################## Calculate Probability ##############################    

def calculateClassProbabilities(summaries, inputVector):
    probabilities = {}
    #classValue willbe either 0 or 1
    for classValue, classSummaries in summaries.items():
        probabilities[classValue] = 1
        for i in range(len(classSummaries)):
            mean,stdev = classSummaries[i]
            x = inputVector[i]
            probabilities[classValue] *= calculateProbability(x,mean,stdev)
    return probabilities

################### Make Predictions ###################################    

def predict(summaries, inputVector):
    probabilities = calculateClassProbabilities(summaries,inputVector)
    bestlabel, bestProb = None, -1
    for classValue, probability in probabilities.items():
        if bestlabel is None or probability > bestProb:
         bestProb = probability
         bestlabel = classValue
    return bestlabel

################### Make Predictions for the test dataset ##############

def getPredictions(summaries, testSet):
    predictions = []
    #for i in range(len(testSet)):
    result = predict(summaries, testSet)
    predictions.append(result)
    #print(testSet)
    return predictions

################### Get the accuracy of the model ######################

def getAccuracy(testSet, predictions):
    try:
            correct = 0
            for x in range(len(testSet)):
                    if testSet[x][-1] == predictions[x]:
                        correct += 1
                    return (correct/float(len(testSet))) * 100.0
    except:
            main()

################### Main Function ######################################            

def main():
    filename = 'data/math(7-9).data.csv'
    splitRatio = 0.79
    dataset = loadcsv(filename)
    #trainingSet is made by taking randomly from the csv
    #testSet will have all other values thats not in traininSet
    trainingSet, testSet = splitDataset(dataset,splitRatio)
    print (len(trainingSet), len(testSet)) # 606 , 162
    summaries = summarizeByClass(trainingSet)
    #summaries will have value only for output 0
    test=[9,9,9,9,7,8,7,8,7,6]
    test.append(0)
    predictions = getPredictions(summaries,test) 
    test[len(test)-1]=int(predictions[0])
    #test.append(predictions)
    print(test)
    print(predictions)
    #for i in range(len(predictions)):
       # if(predictions[i]==0):
        #        count1+=1
        #elif(predictions[i]==1):
         #       count2+=1
    #count=count1+count2
    #print(float((count1*100)/count),float((count2*100)/count))
    accuracy = getAccuracy(testSet,predictions)
    print (accuracy) # 0.617283950617
main()
               
	
