import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error("cabin could not loaded");
    throw new Error("cabin could not loaded");
  }
  return data;
}
// export async function createcabin(newcabin) {
//   // https://iscajfnnccvgsoytflig.supabase.co/storage/v1/object/sign/cabin-images/cabin-001.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDAxLmpwZyIsImlhdCI6MTczMjU1NjA0NCwiZXhwIjoxNzY0MDkyMDQ0fQ.8whHKU6jEcNToOxXGCzSRJ5hTx9MXvePaAZiSU31s6Y&t=2024-11-25T17%3A34%3A04.722Z
//   const imageName = `${Math.random()}-${newcabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = `${supabaseUrl}/storage/v1/object/sign/cabin-images/${imageName}`;
//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([{ ...newcabin, image: imagePath }])
//     .select();
//   if (error) {
//     console.error("cabin not insert");
//     throw new Error("cabin not insert");
//   }
//   // upload image
//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newcabin.image);
//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     throw new Error("cabin  image could not loaded");
//   }
//   return data;
// }
export async function createEditcabin(newcabin, id) {
  const hasImagePath =
    typeof newcabin.image === "string" &&
    newcabin.image.startsWith(supabaseUrl);
  const imageName = `${Date.now()}-${newcabin.image.name}`.replaceAll("/", "");

  let imageUrl = newcabin.image;

  if (!hasImagePath) {
    const { error: uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newcabin.image);

    if (uploadError) {
      console.error("Image upload failed:", uploadError.message);
      throw new Error("Image upload failed");
    }

    const { data: publicData } = supabase.storage
      .from("cabin-images")
      .getPublicUrl(imageName);

    if (!publicData?.publicUrl) {
      throw new Error("Failed to retrieve image URL");
    }
    imageUrl = publicData.publicUrl;
  }

  const query = id
    ? supabase
        .from("cabins")
        .update({ ...newcabin, image: imageUrl })
        .eq("id", id)
    : supabase.from("cabins").insert([{ ...newcabin, image: imageUrl }]);

  const { data, error: insertError } = await query.select("*").maybeSingle();

  if (insertError) {
    console.error("Cabin creation or update failed:", insertError.message);
    throw new Error("Cabin creation or update failed");
  }

  return data;
}

export async function deletecabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("cabin could not loaded");
    throw new Error("cabin could not loaded");
  }
  return data;
}
