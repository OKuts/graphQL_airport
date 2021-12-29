import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import {AppRouter} from "../router/AppRouter";

function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: 'http://localhost:4000/graphql'
    })

    return (
        <ApolloProvider client={client}>
            <div className="app">
                <AppRouter/>
            </div>
        </ApolloProvider>
    );
}

export default App;
