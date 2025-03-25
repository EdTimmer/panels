import {
  AppWrapper, WebLinkContainer,
} from './App.styles'
import SceneWrapper from './components/Scene/SceneWrapper';

function App() {
  return (
    <AppWrapper>
      <SceneWrapper />
      <WebLinkContainer>
        <a href="https://www.edtimmer.com/" target="_blank" aria-label="Link to source code" title="Link to source code">edtimmer.com</a>
      </WebLinkContainer>
    </AppWrapper>
  )
}

export default App;
