import os

class HeadlineExtractor:
    def __init__(self, directory):
        self.directory = directory
        os.makedirs(self.directory, exist_ok=True)  # Ensure directory exists

    def save_article_titles(self, articles):
        # Save all headlines in a single file
        titles_path = os.path.join(self.directory, "titles.txt")
        with open(titles_path, "w", encoding="utf-8") as titles_file:
            for article in articles:
                titles_file.write(article + ".\n")
