# DiabetesPredictor


#to do

## main page 
- **save the result of a logged in user in the database?** shall we display a logged in user his last result?
- general styling of the home tab
- describe our algos etc in the "our approach" tab (but i think i would do that in the end)
- put general information (professors, group members etc) in the about tab
- maxime has to provide us with the infos for the modal and privacy policy tab


## register page
- **add an option there to give the user the possibility to choose if he wants to enable 2FA or not**
- general styling

##login page and the follow up pages of 2FA
- **apply the same css as in the register page (did not find how to do that yet, because the login page was added by the 2FA package)**

##general
- **add the newsletter page only accessible by the admins** (enable the sending of emails and create forms where the admin can write into)
- **we need the user offer the possiblity to delete his account**
- should a logged in user be able to decide if he wants to receive a newsletter or not?




### Pima Indians Diabetes Database
https://www.kaggle.com/uciml/pima-indians-diabetes-database
Dataset contains 769 rows where only women with and without Diabetes are included. Some values are difficult to know for the "normal" people without visiting a doctor. Dataset might not be suitable for our culture, since for example the number of pregnancies is quite different for our culture.
Also did not find out yet how they calculated Diabetes Pedigree. Further information: https://machinelearningmastery.com/case-study-predicting-the-onset-of-diabetes-within-five-years-part-1-of-3/#:~:text=A%20particularly%20interesting%20attribute%20used,those%20relatives%20to%20the%20patient.
But the dataset looks good in general and we can for sure use it somehow. There are many ml solution in kaggle also I think.

Columns: 'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin',
       'BMI', 'DiabetesPedigreeFunction', 'Age'

comment (Sevi): could it be that this dataset is on diabetes type 1? As the diabetes pedigree function has something to do with relatives having this illness and I remember the genetic information being especially important for the type 1.

### Early Stage Diabetes Risk Prediction Dataset
https://www.kaggle.com/ishandutta/early-stage-diabetes-risk-prediction-dataset, File: diabetes_data_upload.csv
Dataset contains 521 rows where men and women with and without Diabetes are included. There 16 describing variables and a «class» variable which says if the person has diabetes or not. The describing variables are mostly medicine terms but it should be possible to write them such that an average person can understand them. Dataset has no missing values!

Columns: 'Age','Gender', 'Polyuria', 'Polydipsia', 'sudden weight loss', 'weakness',
       'Polyphagia', 'Genital thrush', 'visual blurring', 'Itching',

### Austin Public Health Diabetes Self Management Education Participant Demographics 2015-2017
https://catalog.data.gov/dataset/austin-public-health-diabetes-self-management-education-participant-demographics-2015-2017, File: Austin_Public_Health_Diabetes_Self_Management_Education_Participant.csv
Dataset contains 1689 rows with adult men and women with and without diabetes. Variables are more on a personal and sociological level (f.e. race/ethnicity, insurance category etc.) but also on health issues (f.e. heart disease (Yes/No)) and on problematic eating habits (sugar-sweetened beverage consumption). Further there is a variable of a Problem Area in Diabetes (PAID) Scale Score (but there are 1056 missing values for this variable (the 2nd most missing values is 289 in the variable education level)). PAID score is only a self-evaluation people with the disease, so not usable as a description variable. 

Columns: 'Class', 'Class Language', 'Age', 'Year', 'Gender',
       'Insurance Category', 'Medical Home Category', 'Race/Ethnicity',
       'Education Level', 'Diabetes Status (Yes/No)', 'Heart Disease (Yes/No)',
       'High Blood Pressure (Yes/No)', 'Tobacco Use (Yes/No)',
       'Previous Diabetes Education (Yes/No)', 'Diabetes Knowledge',
       'Fruits & Vegetable Consumption',
       'Sugar-Sweetened Beverage Consumption', 'Food Measurement',
       'Carbohydrate Counting', 'Exercise',
       'Problem Area in Diabetes (PAID) Scale Score'


### Diabetes Data from sklearn
https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_diabetes.html
Contains specific medicinal information, also it contains only data for people who already have diabetes. Was gathered in a paper of 2002. 
Columns: 'age', 'sex', 'bmi', 'bp', 's1', 's2', 's3', 's4', 's5', 's6'
where: bp average blood pressure;    
s1 tc, T-Cells (a type of white blood cells);    
s2 ldl, low-density lipoproteins;    
s3 hdl, high-density lipoproteins;    
s4 tch, thyroid stimulating hormone;    
s5 ltg, lamotrigine;   
s6 glu, blood sugar level;    


### NHANES Data 2017 - 2018
https://wwwn.cdc.gov/nchs/nhanes/search/datapage.aspx?Component=Questionnaire&CycleBeginYear=2017
Basically useless, because so many empty values. I wasted time, because the dataset had so many 0, and i thought this would mean yes or no, but it meant an empty value. **I must have a look at the older datasets, maybe they are better**






