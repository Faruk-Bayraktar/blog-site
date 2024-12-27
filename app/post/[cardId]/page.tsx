"use client";
import { useParams } from 'next/navigation';
import CardDetail from '@/components/CardDetail';
import { usePosts } from '@/context/PostsContext';

const PostPage = () => {
    const { cardId } = useParams(); //Burada cardId'yi alıyoruz.
    const { posts } = usePosts(); //Burada postları alıyoruz.
    const post = posts.find((post) => post.cardId === cardId); //Burada postları cardId'ye göre filtreliyoruz.

    if (!post) {
        return <div></div>;
    }

    return (//Burada postları gösteriyoruz.
        <div>
            <CardDetail post={post} />
        </div>
    );
};

export default PostPage;