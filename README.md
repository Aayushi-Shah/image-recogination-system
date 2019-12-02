# Handwriting recognition webapp

Handwriting recognition webapp is a platform that enables user to upload an image with a hand-written text and using Google Cloud Vision API it displays the text of the image

### Tech

Handwriting recognition webapp uses following languages and frameworks:
* [Python]('https://www.python.org/')
* [Django]('https://docs.djangoproject.com/en/2.2/')
* [Django-Rest-Framework]('https://www.django-rest-framework.org/')
* [Javascript]('https://www.javascript.com/')
* [ReactJS]('https://reactjs.org/')

### Installation

Handwriting recognition webapp requires [Python3]('https://www.python.org/downloads/release/python-360/') v3.6+ and [npm]('https://www.npmjs.com/get-npm') to run.

Clone the project from [github]('https://github.com/Aayushi-Shah/image-recogination-system')

```sh
$ git clone https://github.com/Aayushi-Shah/image-recogination-system.git
$ cd image-recogination-system 
```

For Frontend......

```sh
$ cd src
$ npm install
```
Add .env file shared with you in the folder and then
```sh
$ npm start
```

For Backend......
First open a new tab in terminal and move to image-recogination-system folder
```sh
$ virtualenv -p python3 venv
$ source venv/bin/activate 
$ pip3 install -r requirements.txt 
$ cd apps
$ python3 manage.py makemigrations
$ python3 manage.py migrate
$ python3 manage.py runserver
```
Add file 'Ymir-87b2cb672723.json' in apps folder

