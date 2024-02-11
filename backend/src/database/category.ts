import { client } from ".";

export async function getCategories() {
  return await client.category.findMany();
}

export async function getCategory(id: string) {
  const category = await client.category.findUnique({ where: { id } });
  if (!category) return new Error("Category not exists");
  return category;
}

export async function createCategory(name: string) {
  return await client.category.create({ data: { name } });
}
