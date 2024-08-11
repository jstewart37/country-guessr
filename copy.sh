copy_and_rename() {
  file="$1"
  parent_dir=$(dirname "$file")
  new_name="${parent_dir##*/}"
  target_dir="copied_files"  # Replace with your desired target directory

  mkdir -p "$target_dir"  # Create target directory if it doesn't exist
  cp "$file" "$target_dir/$new_name.svg"
}

find . -name "vector.svg" -type f | while read file; do
  copy_and_rename "$file"
done