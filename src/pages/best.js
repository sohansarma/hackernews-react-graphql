import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Main from '../layouts/Main';
import NewsFeed from '../components/presentational/NewsFeed';
import NewsFeedApolloHOC from '../components/container/NewsFeedWithApolloRenderer';
import withData from '../helpers/withData';

const POSTS_PER_PAGE = 30;

const query = gql`
  query bestNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      ...NewsFeed
    }
  }
  ${NewsFeed.fragments.newsItem}
`;

const BestNewsFeed = graphql(query, {
  options: ({ options: { first, skip } }) => ({
    variables: {
      type: 'BEST',
      first,
      skip
    }
  }),
  props: ({ data }) => ({
    data,
  }),
})(NewsFeedApolloHOC);

export default withData(props => {
  const pageNumber = (props.url.query && +props.url.query.p) || 0;
  return (
    <Main currentURL={props.url.pathname}>
      <BestNewsFeed options={{
          currentURL: props.url.pathname,
          first: POSTS_PER_PAGE,
          skip: POSTS_PER_PAGE * pageNumber
        }}
      />
    </Main>
  );
});
