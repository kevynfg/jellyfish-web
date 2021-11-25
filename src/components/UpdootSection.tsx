import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, PostsQuery, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
    post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
    const [loadingState, setLoadingState] = useState<"updoot-loading" | "downdoot-loading" | "not-loading">("not-loading");
    const [, vote] = useVoteMutation();
    return (
        <Flex direction="column" justifyContent="center" alignItems="center" marginRight="4px">
            <IconButton
                aria-label="updoot post"
                icon={<ChevronUpIcon />}
                isLoading={loadingState === "updoot-loading"}
                onClick={async () => {
                    setLoadingState("updoot-loading");
                    await vote({
                        postId: post.id,
                        value: 1,
                    });
                    setLoadingState("not-loading");
                }}
            />
            {post.points}
            <IconButton
                aria-label="downdoot post"
                icon={<ChevronDownIcon />}
                isLoading={loadingState === "downdoot-loading"}
                onClick={async () => {
                    setLoadingState("downdoot-loading");
                    await vote({
                        postId: post.id,
                        value: -1,
                    });
                    setLoadingState("not-loading");
                }}
            />
        </Flex>
    );
};
