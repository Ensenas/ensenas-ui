import Webcam from 'react-webcam'

import { Container, RecordButton } from './RecorderElements'


const Recorder: React.FC = () => {
    return (
        <Container>
            <Webcam width={1920} height={600} />
            <RecordButton />
        </Container>
    )
}

export default Recorder
