
Client:
```bash
cd client
npm install
npm start
```

Server:
```bash
cd server
docker-compose up --build
```



## Tech Stack

**Client:** React, TypeScript

**Server:** Go (Golang), Gin Python, Celery, RabbitMQ, Docker, Socket.IO, DALL-E-2, GPT, MongoDB

## Inspiration 💡
Our inspiration for this project was to leverage new AI technologies such as text to image, text generation and natural language processing to enhance the education space. We wanted to harness the power of machine learning to inspire creativity and improve the way students learn and interact with educational content. We believe that these cutting-edge technologies have the potential to revolutionize education and make learning more engaging, interactive, and personalized.

## What it does 🎮
Our project is a text and image generation tool that uses machine learning to create stories from prompts given by the user. The user can input a prompt, and the tool will generate a story with corresponding text and images. The user can also specify certain attributes such as characters, settings, and emotions to influence the story's outcome. Additionally, the tool allows users to export the generated story as a downloadable book in the PDF format. The goal of this project is to make story-telling interactive and fun for users.

## How we built it 🔨
We built our project using a combination of front-end and back-end technologies. For the front-end, we used React which allows us to create interactive user interfaces. On the back-end side, we chose Go as our main programming language and used the Gin framework to handle concurrency and scalability. To handle the communication between the resource intensive back-end tasks we used a combination of RabbitMQ as the message broker and Celery as the work queue. These technologies allowed us to efficiently handle the flow of data and messages between the different components of our project.

To generate the text and images for the stories, we leveraged the power of OpenAI's DALL-E-2 and GPT-3 models. These models are state-of-the-art in their respective fields and allow us to generate high-quality text and images for our stories. To improve the performance of our system, we used MongoDB to cache images and prompts. This allows us to quickly retrieve data without having to re-process it every time it is requested. To minimize the load on the server, we used socket.io for real-time communication, it allow us to keep the HTTP connection open and once work queue is done processing data, it sends a notification to the React client.

## Challenges we ran into 🚩
One of the challenges we ran into during the development of this project was converting the generated text and images into a PDF format within the React front-end. There were several libraries available for this task, but many of them did not work well with the specific version of React we were using. Additionally, some of the libraries required additional configuration and setup, which added complexity to the project. We had to spend a significant amount of time researching and testing different solutions before we were able to find a library that worked well with our project and was easy to integrate into our codebase. This challenge highlighted the importance of thorough testing and research when working with new technologies and libraries.

## Accomplishments that we're proud of ⭐
One of the accomplishments we are most proud of in this project is our ability to leverage the latest technologies, particularly machine learning, to enhance the user experience. By incorporating natural language processing and image generation, we were able to create a tool that can generate high-quality stories with corresponding text and images. This not only makes the process of story-telling more interactive and fun, but also allows users to create unique and personalized stories.

## What we learned 📚
Throughout the development of this project, we learned a lot about building highly scalable data pipelines and infrastructure. We discovered the importance of choosing the right technology stack and tools to handle large amounts of data and ensure efficient communication between different components of the system. We also learned the importance of thorough testing and research when working with new technologies and libraries.

We also learned about the importance of using message brokers and work queues to handle data flow and communication between different components of the system, which allowed us to create a more robust and scalable infrastructure. We also learned about the use of NoSQL databases, such as MongoDB to cache data and improve performance. Additionally, we learned about the importance of using socket.io for real-time communication, which can minimize the load on the server.

Overall, we learned about the importance of using the right tools and technologies to build a highly scalable and efficient data pipeline and infrastructure, which is a critical component of any large-scale project.

## What's next for Dream.ai 🚀
There are several exciting features and improvements that we plan to implement in the future for Dream.ai. One of the main focuses will be on allowing users to export their generated stories to YouTube. This will allow users to easily share their stories with a wider audience and potentially reach a larger audience.

Another feature we plan to implement is user history. This will allow users to save and revisit old prompts and stories they have created, making it easier for them to pick up where they left off. We also plan to allow users to share their prompts on the site with other users, which will allow them to collaborate and create stories together.

Finally, we are planning to improve the overall user experience by incorporating more customization options, such as the ability to select different themes, characters and settings. We believe these features will further enhance the interactive and fun nature of the tool, making it even more engaging for users.