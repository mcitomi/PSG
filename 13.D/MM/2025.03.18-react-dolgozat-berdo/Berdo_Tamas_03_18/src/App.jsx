import { useState } from "react";

const dogs = [
    {
        name: "Dalma",
        breed: "dalmata",
        age: 3
    },
    {
        name: "Bodri",
        breed: "puli",
        age: 5
    },
    {
        name: "Fickó",
        breed: "tacskó",
        age: 7
    },
    {
        name: "Borisz",
        breed: "moszkvai-őr",
        age: 2
    },
    {
        name: "Vitéz",
        breed: "kaukázusi",
        age: 8
    }
]

function DogProfile({ name, breed, age, addLikeToDog, likeCount }) {
    return (
        <div className="dogProfile">
            <h2>{name}</h2>
            <p>{breed} fajta, {age} éves.</p>
            <button onClick={() => addLikeToDog(name)}>Like</button>
            <p>Lájkok száma: {likeCount}</p>
        </div>
    )
}

export default () => {
    const [likeCount, setLikeCount] = useState([]);

    function addLikeToDog(dogName) {
        if (!likeCount.find(x => x.name == dogName)) {
            const newLikes = [...likeCount];

            newLikes.push({
                name: dogName,
                likes: 1
            });

            setLikeCount(newLikes);
        } else {
            const newLikes = [...likeCount];

            const dog = newLikes.find(x => x.name == dogName);
            newLikes.splice(newLikes.indexOf(dog), 1);

            dog.likes++;
            newLikes.push(dog);

            setLikeCount(newLikes);
        }
    }

    return (
        <>
            <h1>Kutyás</h1>

            {
                dogs.map((dog, i) => {
                    return <DogProfile
                        key={i}
                        name={dog.name}
                        breed={dog.breed}
                        age={dog.age}
                        addLikeToDog={addLikeToDog}
                        likeCount={
                            likeCount.find(x => x.name == dog.name) ?
                                likeCount.find(x => x.name == dog.name).likes : 0
                        }
                    />
                    // raktam bele key prop-ot mert zaklat a console
                })
            }
        </>
    )
}