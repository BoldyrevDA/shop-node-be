export async function hello(event) {
  return {
    statusCode: 200,
    body: JSON.stringify(
        ["product1", "product2"]
    ),
  };
}
