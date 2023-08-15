FROM jhonatans01/python-dlib-opencv
COPY . /app
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get -y update
RUN pip3 install --upgrade pip

RUN pip3 install -U pip wheel cmake
RUN pip3 install dlib
RUN pip3 install face_recognition
RUN pip3 install -r requirements.txt


COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh


ENTRYPOINT ["sh","/app/entrypoint.sh"]