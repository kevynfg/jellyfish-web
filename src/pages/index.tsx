import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from 'next-urql';
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Link, Text, Heading, Box, Flex  } from "@chakra-ui/layout";
import { Button, Stack } from "@chakra-ui/react";
import NextLink from 'next/link';
import React, { useState } from "react";

const Index = () => {
    const [variables, setVariables] = useState({limit: 33, cursor: null as null | string});
    const [{data, fetching}] = usePostsQuery({
        variables
    });

    if (!fetching && !data) {
        return <div>there's no posts to render...</div>;
    }

    return (
     <Layout>
            <Flex align="center">
                <Heading>JellyfishReddit</Heading>
                <NextLink href="/create-post">
                    <Link ml="auto">create post</Link>
                </NextLink>
            </Flex>
            <br />
            {!data && fetching ? (<div>loading...</div>) 
            : (
            <Stack>
                {data!.posts.posts.map((p) => (
                <Box key={p.id} p={5} shadow="md" borderWidth="1px">
                    <Heading fontSize="xl">{p.title}</Heading>
                    <Text mt={4}>{p.textSnippet}</Text>
                </Box>
                ))}
            </Stack> 
            )}
            {
                data && data.posts.hasMore ? (
                    <Flex>
                        <Button onClick={() => {
                            setVariables({
                                limit: variables.limit,
                                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt
                            })
                        }} isLoading={fetching} m="auto" my={8}>load more</Button>
                    </Flex>
                ) : null
            }
     </Layout>
    );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
