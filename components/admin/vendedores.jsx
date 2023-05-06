const Vendedores = ({vendedores}) => {

    console.log(vendedores)
    return (
        <>
        <h1>Admin</h1>

                    <div>
                        <h2>Vendedores</h2>
                        <ul>


                            {
                            vendedores.map((vendedor) => (
                                <li key={vendedor.id}>
                                    {vendedor.first_name} {vendedor.email}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
    )
}

export default Vendedores;
