import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import {AppRouter} from "./pages";
import {BrowserRouter} from "react-router-dom";

function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: 'http://localhost:4000/graphql'
    })

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
