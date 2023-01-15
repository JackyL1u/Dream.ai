import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState, useRef, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import { io } from 'socket.io-client';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import AudioPlayer from './AudioPlayer';

export default function Body() {
    const tagsList = ["Anime", "Cartoon", "Digital Art", "Photo Realistic", "Retro", "Cyber", "Fantasy"]
    const [tags, setTags] = useState<string[]>([]);
    const [audioFiles, setAudiofiles] = useState<string[]>([]);
    const [story, setStory] = useState<{ audio: string, frames: string[], text: string }[]>([]);
    const [prompt, setPrompt] = useState("");
    const [imgURL, setImgURL] = useState("");

    let socket = null;

    const styles = StyleSheet.create({
        center: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        },
        section: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',color: 'white', textAlign: 'center', margin: 30, height: "512px", width: "512px"
        },
        textStory: {
            color: 'black', textAlign: 'center', margin: 30
        }
    });

    const MyDoc = () => (
        <Document>
            {story.map((obj) => (
                <Page size="A4" orientation="landscape">
                    <View style={styles.center}>
                        <View style={styles.section}>
                            <Image src={obj.frames[0]}></Image>
                            <Text style={styles.textStory}>{obj.text}</Text>
                        </View>
                    </View>
                </Page>
            ))}
        </Document>
    );

    const playStory = async (story: { [key: string]: string }[]) => {
        const sleep = (ms: any) => new Promise(r => setTimeout(r, ms));
        let tempArr = []
        for (const property in story) {
            let currentStory = story[property]
            tempArr.push(currentStory.audio)
        }
        setAudiofiles(tempArr)


        const framePromises = async () => {
            for (const property in story) {
                let currentStory = story[property]
                for (const frame of currentStory.frames) {
                    setImgURL(frame)
                    await sleep(1000)
                }
            }
            setAudiofiles([])
            console.log([])
        }

        await framePromises();
    }

    const connectSocket = (socketID: string) => {
        socket = io("http://localhost:5001", {
            transports: ['websocket'], upgrade: false,
            auth: {
                uuid: socketID
            }
        });

        socket.on('connect', () => {
            console.log('connected to ' + socketID);
        });

        socket.on('message', function (data) {
            if (data.story) {
                setStory(data.story)
                playStory(data.story)
            }
        });
    };

    const dream = () => {
        fetch("http://localhost:8080/dream", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                tags: tags
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    connectSocket(result.id)
                },
                (error) => {

                }
            )
    };

    const handleDelete = (tagToDelete: string) => {
        setTags(tags.filter(tag => tag !== tagToDelete));
    }

    const handleAdd = (tag: string) => {
        if (tag != "0" && tags.includes(tag) == false)
            setTags([...tags, tag])
    }


    return (
        <div className="bodyBackground">
            <br />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >

                <Grid item xs={3}>
                    <i className='logo'>
                        <b>Dream.ai</b>
                    </i>
                </Grid>
                <Grid item xs={3}>
                    <p className='test'>You have to dream before your dreams can come true</p>
                </Grid>
                <Grid item xs={3}>
                    <button className='buttonGithub' onClick={() => alert("hi")}><svg style={{ fill: "white" }} width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>&nbsp;&nbsp;Visit our GitHub</button>
                </Grid>
                <Grid item xs={3}>
                    <br />
                    <TextField
                        id="outlined-multiline-flexible"
                        placeholder="Enter your story"
                        multiline
                        className="inputStyle"
                        maxRows={8}
                        inputProps={{ style: { color: "white" } }}
                        onChange={(e) => setPrompt(e.target.value)}
                        style={{ width: "500px" }}
                    />
                </Grid>

                {tags.length > 0 && (
                    <Grid item xs={3}>
                        <br />
                        {tags.map((obj) => (
                            <>
                                <Chip style={{ backgroundColor: "#3730a3", color: "white" }} label={obj} onDelete={() => handleDelete(obj)} key={obj} />
                                &nbsp;
                            </>
                        ))}
                    </Grid>
                )}

                <Grid item xs={3}>
                    <br />
                    <select name="option" id="option" onChange={(e) => handleAdd(e.target.value)} style={{ width: "100px", height: "30px" }}>
                        <option value="0">Add Tag</option>
                        {tagsList.map((obj) => (
                            <option value={obj} key={obj}>{obj}</option>
                        ))}
                    </select>
                </Grid>

                <Grid item xs={3}>
                    <div className="mb-8 flex flex-col items-center">
                        <div className="flex space-x-2">
                            <button className="storyButton" onClick={() => dream()}>Visualize</button>
                        </div>
                    </div>
                </Grid>

                {imgURL != "" && (
                    <Grid item xs={3}>
                        <br />
                        <img width="512" height="512" src={imgURL}></img>
                    </Grid>
                )}

                {imgURL != "" && (
                    <Grid item xs={3}>
                        <br />
                        <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download your Story now!')}
                        </PDFDownloadLink>
                    </Grid>
                )}

                <Grid item xs={3}>
                    <AudioPlayer audioFiles={audioFiles} />
                </Grid>
                <br /><br /><br /><br /><br />
            </Grid>
        </div>
    );
}