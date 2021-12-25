import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import {DisplayData} from "./components"

function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: 'http://localhost:4000/graphql'
    })

    return (
        <ApolloProvider client={client}>
            <div className="app">
                <DisplayData/>
            </div>
        </ApolloProvider>
    );
}

export default App;
