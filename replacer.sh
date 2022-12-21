for file in *; do
    if [ -f "$file" ]; then
        sed -i "s/$1/$5/g" "$file"
        sed -i "s/$2/$6/g" "$file"
        sed -i "s/$3/$7/g" "$file"
        sed -i "s/$4/$8/g" "$file"
    fi
done

# example
# bash replacer.sh References Reference references reference Foods Food foods food