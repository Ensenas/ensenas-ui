import { Container, RecordButton } from "./RecorderElements"
import Webcam from "react-webcam";


const Recorder: React.FC = () => {
    return (
        <Container>
            <Webcam width={1920} height={600} />
            <RecordButton />
        </Container>
    )
}

export default Recorder
