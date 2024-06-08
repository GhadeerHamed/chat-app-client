import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import {split, HttpLink} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';

const authLink = setContext((_, {headers}) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('jwt');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token || "",
		}
	}
});

const url = process.env.REACT_APP_API_URL

const httpLink = new HttpLink({
	uri: url
});

const wsLink = new GraphQLWsLink(createClient({
	url: process.env.REACT_APP_WS_URL
}))

const splitLink = split(
	({query}) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	authLink.concat(httpLink),
);

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<App/>
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
