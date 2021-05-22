from rest_framework.response import Response
import math
import pickle
import numpy as np
import sys
import os

def dummy_results(result_list, entry):
    for i in range(0, len(result_list)):
        if entry == result_list[i]:
            result_list[i] = 1
        else:
            result_list[i] = 0
    return result_list


def process_assessment(request):
    try:
        age = request.data["p_age"]
        degree = request.data["p_degree"]
        gender = request.data["p_gender"]
        disease = request.data["p_disease"]
        pressure = request.data["p_pressure"]
        tobacco = request.data["p_tobacco"]
        education = request.data["p_education"]
        food = request.data["p_food"]
        sugar = request.data["p_sugar"]
        knowledge = request.data["p_knowledge"]
        exercise = request.data["p_exercise"]

        fields = [age,
                  degree,
                  gender,
                  disease,
                  pressure,
                  tobacco,
                  education,
                  food,
                  sugar,
                  knowledge,
                  exercise]

        if None not in fields:
            # following we subtract the mean of the age distribution in the original dataset and then divide the
            # result by the standard deviation
            age = int(10 * math.floor(age * 0.1))
            gender = int(gender)
            disease = int(disease)
            pressure = int(pressure)
            tobacco = int(tobacco)
            education = int(education)

            result = [age, gender, disease, pressure, tobacco, education]
            degree = str(degree)
            degree_list = ["1-8", "9-11", "High School", "College"]
            result.extend(dummy_results(degree_list, degree))

            knowledge = str(knowledge)
            knowledge_list = ["Fair", "Good", "Poor"]
            result.extend(dummy_results(knowledge_list, knowledge))

            food_list = ["0", "1-2", "3-4", "5+", "Not sure"]
            food = str(food)
            result.extend(dummy_results(food_list, food))

            sugar_list = ["0", "1", "2", "3+", "Not sure"]
            sugar = str(sugar)
            result.extend(dummy_results(sugar_list, sugar))

            exercise_list = ["0", "1", "2", "3", "4", "5", "Not sure"]
            exercise = str(exercise)
            result.extend(dummy_results(exercise_list, exercise))

            # Passing data to model & loading the model from disks
            model_path = os.path.join(sys.path[0],'ml_model/model.pkl')
            classifier = pickle.load(open(model_path, 'rb'))
            prediction = classifier.predict([result])[0]
            conf_score = np.max(classifier.predict_proba([result])) * 100
            predictions = {
                'error': '0',
                'message': 'Successful',
                'prediction': prediction,
                'confidence_score': conf_score
            }
        else:
            predictions = {
                'error': '1',
                'message': 'Invalid Parameters'
            }
    except Exception as e:
        predictions = {
            'error': '2',
            "message": str(e)
        }
    return Response(predictions)
