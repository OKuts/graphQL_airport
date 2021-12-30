import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import {Home} from "../pages";

function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: 'http://localhost:4000/graphql'
    })

    return (
        <ApolloProvider client={client}>
            <div className="app">
                <Home />
            </div>
        </ApolloProvider>
    );
}

export default App;
