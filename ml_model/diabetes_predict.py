

import pandas as pd
import numpy as np
import sklearn
import warnings
warnings.filterwarnings('ignore')
warnings.filterwarnings('ignore', category=DeprecationWarning)

"""### Importing data as a DataFrame"""

#Data Source: https://data.austintexas.gov/Health-and-Community-Services/Austin-Public-Health-Diabetes-Self-Management-Educ/48iy-4sbg


austin_file = open("Austin_Public_Health_Diabetes_Self_Management_Education_Participant.csv")
df_austin = pd.read_csv(austin_file, header = 0, delimiter = ",")



"""### Get info about the data"""

#print(df_austin.head())


"""## Feature Information


"""

df_austin.info()

df_austin.describe()

"""### Data Cleaning"""

df_austin.isna().sum()

#Dropping the NANs, but first drop "Problem Area in Diabetes (PAID) Scale Score", else we lose all non-diabetic people
df_austin=df_austin.drop(columns=["Problem Area in Diabetes (PAID) Scale Score","Class","Year","Class Language","Insurance Category","Medical Home Category", "Race/Ethnicity", "Food Measurement","Carbohydrate Counting"])
df_austin = df_austin.dropna()

#Cleaning data, f.e. 7 have the diabetes status unknown --> drop them
indexes_to_delete = []
indexes_to_delete.extend(df_austin[df_austin["Diabetes Status (Yes/No)"] == "Unknown"].index)
indexes_to_delete.extend(df_austin[df_austin["Education Level"] == "none"].index)
#print(indexes_to_delete)
df_austin.drop(indexes_to_delete , inplace=True)


#print("df_austin[df_austin[Gender]]",df_austin[df_austin["Gender"]=="f"])
df_austin.loc[1168,"Gender"] = "F"
#print("df_austin[df_austin[Gender]]",df_austin[df_austin["Gender"]=="f"])
df_austin =df_austin.replace(to_replace="Some College", value='College', regex=True)

def handling_ordinal_and_yes_no(df):
  ordinal = ["Education Level","Diabetes Knowledge","Fruits & Vegetable Consumption","Sugar-Sweetened Beverage Consumption","Exercise"]

  ordinal_df = pd.get_dummies(df[ordinal])
  df = df.drop(columns=ordinal)
  df = df.merge(ordinal_df,how="inner",left_index=True,right_index=True)
  yes_no_list = ['Gender',"Diabetes Status (Yes/No)","High Blood Pressure (Yes/No)","Heart Disease (Yes/No)","Tobacco Use (Yes/No)","Previous Diabetes Education (Yes/No)"]
  mapping = {'Yes':1,
           'No':0,
            "M":1,
            "F":0,
             }
  features = df[yes_no_list]
  for i in yes_no_list:

    df[i] = features[i].map(mapping)
  return df

#shuffling dataframe
df_austin = sklearn.utils.shuffle(df_austin)
#creating dummy variables and transferring "yes" and "no" into 1 and 0
df_austin.Age=pd.cut(df_austin.Age,bins=[0,10,20,30,40,50,60,70,80,90,100,110], labels=["0","10","20","30","40","50","60","70","80","90","100"])
df_austin = handling_ordinal_and_yes_no(df_austin)

print("df_austin.Age.value_counts()",df_austin["Age"].value_counts())

for col in df_austin.columns:
    print(col)

"""### Building the ML model"""
"""Just the models we tested:"""
"""
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression, LogisticRegressionCV

def compute_score(clf, X, y, scoring='accuracy'):
    xval = cross_val_score(clf, X, y, cv = 5, scoring=scoring)
    return np.mean(xval) #Cross validation to check for biasness and variance

#Testing different base models
logreg = LogisticRegression()
logreg_cv = LogisticRegressionCV()
rf = RandomForestClassifier()
gboost = GradientBoostingClassifier()
"""
from sklearn.neural_network import MLPClassifier




y = df_austin["Diabetes Status (Yes/No)"]
df_austin_full = df_austin.copy()
df_austin_without_y = df_austin_full.drop('Diabetes Status (Yes/No)',1)
X = df_austin_without_y.copy()
X =X.values
y =y.values



mlp = MLPClassifier(learning_rate_init=0.01,activation="identity",solver="lbfgs",alpha=0.1,hidden_layer_sizes=(50,50))


from sklearn.model_selection import train_test_split



X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=0)
"""Grid Search"""
"""
from sklearn.model_selection import GridSearchCV
from sklearn.pipeline import Pipeline

mlpc = Pipeline([
    ('mlpc', MLPClassifier(max_iter=1000, learning_rate = "constant"))
])
param_grid = {
              "mlpc__hidden_layer_sizes":[(50,50),(10,10),(100,100)],
              "mlpc__alpha": [0.1,0.01,0.001,0.0001,0.00001],
              "mlpc__solver":["lbfgs","adam","sgd"],
              "mlpc__learning_rate_init":[0.01,0.001,0.0001,0.00001],
              "mlpc__activation":["identity", "logistic", "tanh", "relu"]
              }



gs_svc = GridSearchCV(mlpc, param_grid, cv=2, n_jobs=2, verbose=1)
gs_svc.fit(X_train, y_train)
svc_df = pd.DataFrame.from_dict(gs_svc.cv_results_)
svc_df.sort_values(by=["rank_test_score"])
print("param_mlpc__hidden_layer_sizes",svc_df["param_mlpc__hidden_layer_sizes"])
print("param_mlpc__alpha",svc_df["param_mlpc__alpha"])
print("param_mlpc__learning_rate_init",svc_df["param_mlpc__learning_rate_init"])
print("param_mlpc__solver",svc_df["param_mlpc__solver"])
print("param_mlpc__activation",svc_df["param_mlpc__activation"])
"""
#Using the random forest algorithm
model = mlp.fit(X_train,y_train)

y_pred = model.predict(X_test)

#Check the prediction precision and accuracy
"""only for testing"""

from sklearn.metrics import classification_report

print(classification_report(y_test,y_pred))

#Saving the model with pickle
import pickle

# save the model to disk
model_name  = 'model.pkl'
pickle.dump(model, open(model_name, 'wb'))

print("[INFO]: Finished saving model...")

