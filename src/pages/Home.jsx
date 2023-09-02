import { useEffect, useState } from "react"
import axios from 'axios'
import TextOverlay from '../component/TextOverlay';
const access_key = import.meta.env.VITE_ACCESS_KEY;

const Home = () => {
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false)
    const [textOverlays, setTextOverlays] = useState([]);

    // fetching image from Unsplash.com
    useEffect(() => {
        async function fetch() {
            setLoading(true)
            const res = await axios.get(`https://api.unsplash.com/search/photos?client_id=${access_key}&orientation=landscape&query=office`)
            setImage(res.data?.results[1]);
            setLoading(false)
        }
        fetch()
    }, [])

    // On clicking on add Text button, first i am calculating new postion for newly created text overlay so that
    // it won't go over previous text overlay
    const addTextOverlay = () => {
        const newPosition = calculateInitialPosition();
        setTextOverlays([...textOverlays, { text: 'Your Text Here', position: newPosition }]);
    };

    const calculateInitialPosition = () => {
        const overlayCount = textOverlays.length;
        const offset = 20;
        const newPosition = {
          x: overlayCount * offset,
          y: overlayCount * offset,
        };
        return newPosition;
    };

    // Updating text overlay
    const updateTextOverlay = (index, newText) => {
        const updatedOverlays = [...textOverlays];
        updatedOverlays[index].text = newText;
        setTextOverlays(updatedOverlays);
    };

    // Deleting text overlay
    const deleteTextOverlay = (index) => {
        console.log(index)
        const updatedOverlays = [...textOverlays];
        updatedOverlays.splice(index, 1);
        setTextOverlays(updatedOverlays);
    };
  

    return (
        <>
            <div className="font-semibold text-2xl w-full flex justify-center mt-8">
                <button onClick={addTextOverlay} className="bg-blue-600 text-white px-5 py-2 rounded-sm">Add Text</button>
            </div>
            {loading ?
                <div className="text-xl w-full flex justify-center mt-10">loading...</div>
                :
                <div className="flex justify-center p-3" style={{ position: 'relative' }}>
                    <img src={image?.urls?.raw} alt="image" style={{ height: '80vh', width: '80vw' }} />
                    {textOverlays.map((overlay, index) => (
                        <TextOverlay
                            key={index}
                            text={overlay.text}
                            position={overlay.position}
                            onUpdateText={(newText) => updateTextOverlay(index, newText)}
                            onDelete={() => deleteTextOverlay(index)}
                        />
                    ))}
                </div>
            }

        </>
    )
}

export default Home