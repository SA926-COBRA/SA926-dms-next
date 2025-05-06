
interface PageProps {
    params: {
        name: string
    }
}

const Page = (props: PageProps) => {
    return (
        <div>My name is {props.params.name}</div>
    )
}

export default Page