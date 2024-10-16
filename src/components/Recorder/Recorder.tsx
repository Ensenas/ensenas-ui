import Webcam from 'react-webcam'

import { Container } from './RecorderElements'


const Recorder: React.FC = () => {
    return (
        <Container>
            <Webcam width={1920} height={600} />
        </Container>
    )
}

export default Recorder
