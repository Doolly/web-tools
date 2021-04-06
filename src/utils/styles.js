import styled from 'styled-components';
import { 
    ButtonGroup
} from 'reactstrap';

export const AppContainer = styled.div `
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    padding: 10px 40px;
`
export const CanvasContainer = styled.div `
    width: 65%;
    height: auto;
    margin: 0 10px 0 0;
    box-sizing: border-box;
    border: 1px solid #d7d7d7;
`
export const ContentsContainer = styled.div `
    width: 35%;
    height: auto;    
    margin: 0;
    box-sizing: border-box;
`
export const Canvas = styled.canvas `
`
export const CameraImage = styled.img `
    width: 100%;
    height: auto;
`
export const Contents = styled.div `
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`
export const CameraContainer = styled.div `
    width: 100%;
    height: auto;
    border: 1px solid #d7d7d7;
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
    padding: 10px;
    box-sizing: border-box;
`
export const ButtonContainer= styled.div `
    width: 100%;
    border: 1px solid #d7d7d7;
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
    padding: 10px;
    box-sizing: border-box;
`
export const CustomButtonGroup = styled(ButtonGroup) `
    display: flex;
    flex-direction: column;
    margin-right: 24px ;
`
export const ButtonTitle = styled.h5 `
    font-size: 16px;
    margin-top: 12px;
    letter-spacing: -0.5px;
`
export const Title = styled.div `
    font-size: 20px;
    letter-spacing: -0.5px;
`
export const TitleContainer = styled.div `
    width: 100%;
    padding: 4px 10px 10px 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
`
