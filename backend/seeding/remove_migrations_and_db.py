import os
import shutil


def remove_migrations_and_db():
    def delete_migrations_folders(root_folder):
        for root, dirs, files in os.walk(root_folder):
            for dir_name in dirs:
                if dir_name == "migrations":
                    folder_path = os.path.join(root, dir_name)
                    print(f"Cleaning folder: {folder_path}")
                    # Delete all files in the folder

                    # # Delete all subfolders recursively
                    # print(dirs)
                    # for subfolder in dirs:

                    #     subfolder_path = os.path.join(folder_path, subfolder)
                    #     print("sub folder",subfolder,subfolder_path)
                    #     shutil.rmtree(folder_path)
                    # break
                    for subroot, subdirs, subfiles in os.walk(folder_path):
                        for i in subdirs:
                            shutil.rmtree(os.path.join(subroot, i))
                        for i in subfiles:
                            os.remove(os.path.join(subroot, i))

                        with open(os.path.join(subroot, '__init__.py'), 'w'):
                            pass
                    break

    # Specify the root folder from which you want to delete the "migrations" folders
    root_folder = ""

    # Call the function to delete the "migrations" folders
    delete_migrations_folders("./apps")
    if os.path.exists(os.path.join(root_folder, 'db.sqlite3')):
        os.remove(os.path.join(root_folder, 'db.sqlite3'))
